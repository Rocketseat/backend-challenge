import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { AnswerStatus } from '@prisma/client';
import { ListAnswersArgs } from './dto/list-answers.args';
import { AnswerRepository } from './repositories/answer.repository';
import { ChallengeRepository } from 'src/challenge/repositories/challenge.repository';
import { validateGitUrl } from '../utils/validate-git-url';
import { Challenge } from '../challenge/entities/challenge.entity';

@Injectable()
export class AnswerService {
  constructor(
    @Inject('AnswerRepository')
    private readonly answerRepository: AnswerRepository,

    @Inject('ChallengeRepository')
    private readonly challengeRepository: ChallengeRepository,
  ) {}
  async create(createAnswerInput: CreateAnswerInput) {
    const { challengeId, repositoryUrl } = createAnswerInput;
    let status: AnswerStatus = AnswerStatus.PENDING;
    let errorMessage = null;
    let challenge: Challenge = null;

    const repositoryUrlValidation = await validateGitUrl(repositoryUrl);
    if (!repositoryUrlValidation.valid) {
      status = AnswerStatus.ERROR;
      errorMessage = repositoryUrlValidation.message;
    } else {
      challenge = await this.challengeRepository.findOne(challengeId);

      if (!challenge) {
        status = AnswerStatus.ERROR;
        errorMessage = 'Invalid challenge';
      }
    }

    return this.answerRepository.create({
      status,
      repositoryUrl,
      challengeId: challenge ? challengeId : null,
      errorMessage,
    });
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
}
