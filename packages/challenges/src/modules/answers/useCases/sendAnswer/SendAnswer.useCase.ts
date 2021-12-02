import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { GitHubProvider } from '../../../../providers/GitHub.provider';
import { UseCaseError } from '../../../../errors/UseCase.error';
import { ChallengeRepository } from '../../../challenges/repositories/prisma/Challenge.repository';
import { AnswerRepository } from '../../repositories/prisma/Answer.repository';
import { IAnswer } from '../../interfaces/IAnswer.interface';

interface CorrectLessonMessage {
  submissionId: string;
  repositoryUrl: string;
}
@Injectable()
export class SendAnswerUseCase implements OnModuleInit {
  private _kafkaProducer: Producer;

  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly challengeRepository: ChallengeRepository,
    private readonly gitHubProvider: GitHubProvider,
    @Inject('answer-kafka')
    private readonly clientKafka: ClientKafka,
  ) {}

  private async kafkaConnect() {
    return this.clientKafka.connect();
  }

  private set kafkaProducer(producer: Producer) {
    this._kafkaProducer = producer;
  }

  async onModuleInit() {
    const kafkaConnection = await this.kafkaConnect();
    this.kafkaProducer = kafkaConnection;
  }

  async execute(creatAnswerInput: any): Promise<IAnswer> {
    const errors = [];
    const answerData = {
      ...creatAnswerInput,
      status: 'Pending',
      grade: null,
    };

    if (creatAnswerInput.challengeId === undefined) {
      errors.push('challengeId is required');
      answerData.challengeId = null;
    } else {
      const challengeIsValid = await this.challengeRepository.idIsValid(
        creatAnswerInput.challengeId,
      );

      if (!challengeIsValid) {
        errors.push('challengeId is invalid');
        answerData.challengeId = null;
      }
    }

    const urlValidated = this.gitHubProvider.urlIsValid(creatAnswerInput.link);

    if (!urlValidated) {
      errors.push('link is invalid');
    } else {
      const test = await this.gitHubProvider.urlIsRepository(
        creatAnswerInput.link,
      );

      if (!test) {
        errors.push('link is not a repository');
      }
    }

    errors.length > 0 && (answerData.status = 'Error');

    const answer = await this.answerRepository.create(answerData);

    if (errors.length > 0) {
      throw new UseCaseError(errors, answer);
    }

    this._kafkaProducer.send({
      topic: 'challenge.correction',
      messages: [
        {
          key: answer.id,
          value: JSON.stringify({
            submissionId: creatAnswerInput.challengeId,
            repositoryUrl: creatAnswerInput.link,
          } as CorrectLessonMessage),
        },
      ],
    });

    return answer;
  }
}
