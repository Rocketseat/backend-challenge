import { PrismaService } from 'src/prisma/prisma.service';
import { AnswerRepository } from '../answer.repository';
import { CreateAnswerRepositoryInput } from 'src/answer/dto/create-answer.repo.input';
import { Answer } from 'src/answer/entities/answer.entity';
import { parseFilters } from 'src/utils/parse-filters';
import { UpdateAnswerRepositoryInput } from 'src/answer/dto/update-answer.repo.input';
import { Injectable } from '@nestjs/common';
import { ListAnswersRepositoryArgs } from 'src/answer/dto/List-answers.repo.args';

@Injectable()
export class AnswerPrismaRepository implements AnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateAnswerRepositoryInput): Promise<Answer> {
    const { status, repositoryUrl, challengeId, errorMessage } = input;
    return this.prisma.answer.create({
      data: {
        status,
        repositoryUrl,
        challengeId,
        errorMessage,
      },
    });
  }

  async findOne(id: string): Promise<Answer> {
    return this.prisma.answer.findUnique({
      where: { id },
    });
  }

  async findMany(args: ListAnswersRepositoryArgs) {
    const { skip, take, challengeId, status, startDate, endDate } = args;

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

  async update(input: UpdateAnswerRepositoryInput) {
    const { id, ...data } = input;
    return this.prisma.answer.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    this.prisma.answer.delete({
      where: { id },
    });
  }
}
