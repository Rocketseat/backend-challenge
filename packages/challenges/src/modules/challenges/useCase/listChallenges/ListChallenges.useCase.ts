import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/core/domain/Pagination.interface';
import { PaginationInput } from '../../dto/pagination.input';
import { ChallengeRepository } from '../../repositories/prisma/Challenge.repository';

interface IListChallengesInput {
  pagination?: PaginationInput;
  search?: string;
}

@Injectable()
export class ListChallengesUseCase {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async execute(listChallengesInput?: IListChallengesInput) {
    const DEFAULT_PAGINATION = {
      page: 1,
      pageSize: 10,
    } as Pagination;

    const challenges = await this.challengeRepository.listAll(
      {
        ...DEFAULT_PAGINATION,
        ...listChallengesInput?.pagination,
      },
      listChallengesInput?.search,
    );

    return challenges;
  }
}
