import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { AnswerStatus } from '@prisma/client';
import { ListAnswersArgs } from './dto/list-answers.args';
import { AnswerRepository } from './repositories/answer.repository';
import { ChallengeRepository } from 'src/challenge/repositories/challenge.repository';

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

    const repoResponse = await fetch(repositoryUrl, {
      method: 'HEAD',
    });

    if (!repoResponse.ok) {
      status = AnswerStatus.ERROR;
    }

    const challenge = await this.challengeRepository.findOne(challengeId);

    if (!challenge) {
      status = AnswerStatus.ERROR;
    }

    return this.answerRepository.create({
        status,
        repositoryUrl,
        challengeId: challenge ? challengeId : null,
      });
  }

  findAll(args: ListAnswersArgs) {
    const defaultPageSize = 15;
    let { page, limit, challengeId, status, startDate, endDate } = args;
    limit = limit ?? defaultPageSize;
    page = page ? (page - 1) * limit : 0;

    return this.answerRepository.findMany({
      page,
      limit,
      challengeId,
      status,
      startDate,
      endDate
    });
  }

  findOne(id: string) {
    return this.answerRepository.findOne(id);
  }

  update(updateAnswerInput: UpdateAnswerInput) {
    return this.answerRepository.update(updateAnswerInput);
  }

  remove(id: string) {
    return this.answerRepository.delete(id);
  }
}
