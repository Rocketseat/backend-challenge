import { Injectable } from '@nestjs/common';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { PrismaService } from '../prisma/prisma.service';
import { AnswerStatus } from '@prisma/client';
import { ListAnswersArgs } from './dto/list-answers.args';
import { parseFilters } from '../utils/parse-filters';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAnswerInput: CreateAnswerInput) {
    const { challengeId, repositoryUrl } = createAnswerInput;
    let status: AnswerStatus = AnswerStatus.PENDING;

    const repoResponse = await fetch(repositoryUrl, {
      method: 'HEAD',
    });

    if (!repoResponse.ok) {
      status = AnswerStatus.ERROR;
    }

    const challenge = await this.prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) {
      status = AnswerStatus.ERROR;
    }

    return this.prisma.answer.create({
      data: {
        status,
        repositoryUrl,
        challengeId: challenge ? challengeId : null,
      },
    });
  }

  findAll(args: ListAnswersArgs) {
    const defaultPageSize = 15;
    const { page, limit, challengeId, status, startDate, endDate } = args;
    const take = limit ?? defaultPageSize;
    const skip = page ? (page - 1) * take : 0;
    const queryArgs = {
      skip,
      take,
      where: parseFilters([
        {
          field: 'challengeId',
          operator: 'equals',
          value: challengeId,
        },
        {
          field: 'status',
          operator: 'equals',
          value: status,
        },
        {
          field: 'createdAt',
          operator: 'gte',
          value: startDate,
        },
        {
          field: 'createdAt',
          operator: 'lte',
          value: endDate,
        },
      ]),
    };

    return this.prisma.answer.findMany(queryArgs);
  }

  findOne(id: string) {
    return this.prisma.answer.findUniqueOrThrow({ where: { id } });
  }

  update(updateAnswerInput: UpdateAnswerInput) {
    const { id, ...data } = updateAnswerInput;
    return this.prisma.answer.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.answer.delete({ where: { id } });
  }
}
