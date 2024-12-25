import { Inject, Injectable } from '@nestjs/common';
import { CreateChallengeInput } from './dto/create-challenge.input';
import { UpdateChallengeInput } from './dto/update-challenge.input';
import { PrismaService } from '../prisma/prisma.service';
import { ListChallengesArgs } from './dto/list-challenges.args';
import { parseFilters } from '../utils/parse-filters';
import { ChallengeRepository } from './repositories/challenge.repository';

@Injectable()
export class ChallengeService {
  constructor(
    @Inject('ChallengeRepository')
    private readonly challengeRepository: ChallengeRepository
  ) {}
  create(createChallengeInput: CreateChallengeInput) {
    return this.challengeRepository.create(createChallengeInput);
  }

  findAll(args: ListChallengesArgs) {
    let { page, limit, title, description } = args;
    const defaultPageSize = 15;
    limit = limit ?? defaultPageSize;
    page = page ? (page - 1) * limit : 0;
    const queryArgs = {
      page,
      limit,
      title,
      description,
    };

    return this.challengeRepository.findMany(queryArgs);
  }

  findOne(id: string) {
    return this.challengeRepository.findOne(id);
  }

  update(updateChallengeInput: UpdateChallengeInput) {
    return this.challengeRepository.update(updateChallengeInput);
  }

  remove(id: string) {
    return this.challengeRepository.delete(id);
  }
}
