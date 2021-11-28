import { Injectable } from '@nestjs/common';
import { CreateChallengeInput } from '../../dto/create-challenge.input';
import { PaginationInput } from '../../dto/pagination.input';
import { IChallenge } from '../../interfaces/IChallenge.interface';
import { IChallengeRepository } from '../IChallenge.repository';

@Injectable()
export class ChallengeInMemoryRepository implements IChallengeRepository {
  private _challenges: IChallenge[] = [];

  async create(createChallengeInput: CreateChallengeInput) {
    const challenge = {
      ...createChallengeInput,
      id: `${Number(this._challenges.length) + 1}`,
      createdAt: new Date(),
    };

    this._challenges.push(challenge);

    return challenge;
  }

  async findById(challengeId: string) {
    return this._challenges.find((challenge) => challenge.id === challengeId);
  }

  async removeById(challengeId: string) {
    const challengeIndex = this._challenges.findIndex(
      (challenge) => challenge.id === challengeId,
    );

    if (challengeIndex === -1) {
      return false;
    }

    this._challenges.splice(challengeIndex, 1);

    return true;
  }

  async updateById(challengeId: string, challenge: Partial<IChallenge>) {
    const challengeIndex = this._challenges.findIndex(
      (challengeItem) => challengeItem.id === challengeId,
    );

    if (challengeIndex === -1) {
      return null;
    }

    this._challenges[challengeIndex] = {
      ...this._challenges[challengeIndex],
      ...challenge,
    };

    return this._challenges[challengeIndex];
  }

  private searchText(text: string, search: string) {
    return text.toLowerCase().includes(search.toLowerCase());
  }

  async listAll(pagination?: PaginationInput, search?: string) {
    const { page, pageSize } = pagination;

    const challengesFiltered = search
      ? this._challenges.filter(
          (challenge) =>
            this.searchText(challenge.title, search) ||
            this.searchText(challenge.description, search),
        )
      : this._challenges;

    const totalChallenges = challengesFiltered.length;
    const totalPages = Math.ceil(totalChallenges / pageSize);
    const containsNextPage = page < totalPages;

    const challenges = challengesFiltered.slice(
      pageSize * (page - 1),
      pageSize * page,
    );

    return {
      challenges,
      pagination: {
        page,
        pageSize,
        totalPages,
        totalChallenges,
        containsNextPage,
      },
    };
  }

  async idIsValid(challengeId: string) {
    const idValid = this._challenges.some(
      (challenge) => challenge.id === challengeId,
    );

    return idValid;
  }
}
