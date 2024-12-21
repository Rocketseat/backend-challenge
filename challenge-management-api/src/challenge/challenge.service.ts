import { Injectable } from '@nestjs/common';
import { CreateChallengeInput } from './dto/create-challenge.input';
import { UpdateChallengeInput } from './dto/update-challenge.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { ListChallengesArgs } from './dto/list-challenges.args';
import { parsePartialFilters } from 'src/utils/parse-filters';

@Injectable()
export class ChallengeService {
  constructor(private prisma: PrismaService) {}
  create(createChallengeInput: CreateChallengeInput) {
    return this.prisma.challenge.create({
      data: createChallengeInput,
    });
  }

  findAll(args: ListChallengesArgs) {
    const defaultPageSize = 15;
    const { page, limit, title, description } = args;
    const take = limit ?? defaultPageSize;
    const skip = page ? (page - 1) * take : 0;
    const queryArgs = {
      skip,
      take,
      where: parsePartialFilters({ title, description }),
    };

    return this.prisma.challenge.findMany(queryArgs);
  }

  findOne(id: string) {
    return this.prisma.challenge.findFirst({
      where: { id },
    });
  }

  update(updateChallengeInput: UpdateChallengeInput) {
    const { id, ...data } = updateChallengeInput;
    return this.prisma.challenge.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.challenge.delete({ where: { id } });
  }
}
