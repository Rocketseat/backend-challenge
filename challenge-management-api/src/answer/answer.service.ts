import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { AnswerStatus } from '@prisma/client';
import { ListAnswersArgs } from './dto/list-answers.args';
import { AnswerRepository } from './repositories/answer.repository';
import { ChallengeRepository } from 'src/challenge/repositories/challenge.repository';
import { validateGitUrl } from '../utils/validate-git-url';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AnswerService {
  constructor(
    @Inject('AnswerRepository')
    private readonly answerRepository: AnswerRepository,

    @Inject('ChallengeRepository')
    private readonly challengeRepository: ChallengeRepository,

    @Inject('KAFKA_PRODUCER')
    private producer: ClientKafka,
  ) {}
  async create(createAnswerInput: CreateAnswerInput) {
    const { challengeId, repositoryUrl } = createAnswerInput;
    let status: AnswerStatus = AnswerStatus.PENDING;
    let errorMessage = null;

    const repositoryUrlValidation = await validateGitUrl(repositoryUrl);
    if (!repositoryUrlValidation.valid) {
      status = AnswerStatus.ERROR;
      errorMessage = repositoryUrlValidation.message;
    }

    const challenge = await this.challengeRepository.findOne(challengeId);

    if (!challenge) {
      status = AnswerStatus.ERROR;
      errorMessage = 'Invalid challenge';
    }

    const answer = await this.answerRepository.create({
      status,
      repositoryUrl,
      challengeId: challenge ? challengeId : null,
      errorMessage,
    });

    if (answer.status === AnswerStatus.PENDING) {
      this.sendChallengeToTopic(answer.id, repositoryUrl);
    }
    return answer;
  }

  findMany(args: ListAnswersArgs) {
    const defaultPageSize = 15;
    const { page, limit, ...data } = args;
    const take = limit ?? defaultPageSize;
    const skip = page ? (page - 1) * take : 0;

    return this.answerRepository.findMany({
      skip,
      take,
      ...data,
    });
  }

  findOne(id: string) {
    return this.answerRepository.findOne(id);
  }

  update(updateAnswerInput: UpdateAnswerInput) {
    return this.answerRepository.update(updateAnswerInput);
  }

  delete(id: string) {
    return this.answerRepository.delete(id);
  }

  sendChallengeToTopic(submissionId: string, repositoryUrl: string): void {
    // rxjs 7+ fez o "toPromise" ficar deprecated, substituindo por este
    // subscriber. Criei este método para facilitar o mock
    firstValueFrom(
      this.producer.send(
        'challenge.correction',
        JSON.stringify({
          submissionId,
          repositoryUrl,
        }),
      ),
    );
  }
}
