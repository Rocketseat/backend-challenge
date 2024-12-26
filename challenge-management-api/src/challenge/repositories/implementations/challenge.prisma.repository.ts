import { CreateChallengeInput } from 'src/challenge/dto/create-challenge.input';
import { UpdateChallengeInput } from 'src/challenge/dto/update-challenge.input';
import { Challenge } from 'src/challenge/entities/challenge.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { parseFilters } from 'src/utils/parse-filters';
import { ChallengeRepository } from '../challenge.repository';
import { Injectable } from '@nestjs/common';
import { ListChallengesRepoArgs } from 'src/challenge/dto/list-challenges.repo.args';

@Injectable()
export class ChallengePrismaRepository implements ChallengeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateChallengeInput): Promise<Challenge> {
    return this.prisma.challenge.create({ data: input });
  }

  async findOne(id: string): Promise<Challenge> {
    return this.prisma.challenge.findUnique({ where: { id } });
  }

  async findByTitle(title: string): Promise<Challenge | null> {
    return this.prisma.challenge.findFirst({ where: { title } });
  }

  async findMany(args: ListChallengesRepoArgs): Promise<Challenge[]> {
    const { skip, take, title, description } = args;
    const queryArgs = {
      skip,
      take,
      where: parseFilters([
        {
          field: 'title',
          operator: 'contains',
          value: title,
        },
        {
          field: 'description',
          operator: 'contains',
          value: description,
        },
      ]),
    };

    return this.prisma.challenge.findMany(queryArgs);
  }

  async update(input: UpdateChallengeInput): Promise<Challenge> {
    const { id, ...data } = input;
    return this.prisma.challenge.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    this.prisma.challenge.delete({ where: { id } });
  }
}
