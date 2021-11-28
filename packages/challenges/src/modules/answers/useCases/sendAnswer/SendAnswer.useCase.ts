import { Injectable } from '@nestjs/common';
import { GitHubProvider } from '../../../../providers/GitHub.provider';
import { UseCaseError } from '../../../../errors/UseCase.error';
import { ChallengeRepository } from '../../../challenges/repositories/prisma/Challenge.repository';
import { AnswerRepository } from '../../repositories/prisma/Answer.repository';
import { IAnswer } from '../../interfaces/IAnswer.interface';

@Injectable()
export class SendAnswerUseCase {
  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly challengeRepository: ChallengeRepository,
    private readonly gitHubProvider: GitHubProvider,
  ) {}

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

    return answer;
  }
}
