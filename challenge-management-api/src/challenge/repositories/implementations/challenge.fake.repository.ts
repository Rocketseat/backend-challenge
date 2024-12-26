import { Challenge } from 'src/challenge/entities/challenge.entity';
import { ChallengeRepository } from '../challenge.repository';
import { CreateChallengeInput } from 'src/challenge/dto/create-challenge.input';
import { UpdateChallengeInput } from 'src/challenge/dto/update-challenge.input';
import { Injectable } from '@nestjs/common';
import { ListChallengesRepoArgs as ListChallengesRepositoryArgs } from 'src/challenge/dto/list-challenges.repo.args';

@Injectable()
export class ChallengeFakeRepository implements ChallengeRepository {
  public challenges: Challenge[] = [];

  async create(input: CreateChallengeInput): Promise<Challenge> {
    const challengeData = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...input,
    };
    this.challenges.push(challengeData);
    return challengeData;
  }

  async findOne(id: string): Promise<Challenge> {
    return this.challenges.find((challenge) => challenge.id === id);
  }

  async findByTitle(title: string): Promise<Challenge> {
    return this.challenges.find((challenge) => challenge.title === title);
  }

  async findMany(args: ListChallengesRepositoryArgs): Promise<Challenge[]> {
    const { skip, take, ...filters } = args;
    let result = this.challenges;
    for (const filter in filters) {
      result = result.filter((challenge) =>
        challenge[filter].toLowerCase().includes(filters[filter].toLowerCase()),
      );
    }
    return result.slice(skip, skip + take);
  }

  async update(input: UpdateChallengeInput): Promise<Challenge> {
    const { id, ...data } = input;
    const challenge = this.challenges.find((challenge) => challenge.id === id);
    this.challenges = this.challenges.filter(
      (challenge) => challenge.id !== id,
    );
    const updatedChallenge = {
      updatedAt: new Date(),
      ...challenge,
      ...data,
    };
    this.challenges.push(updatedChallenge);
    return updatedChallenge;
  }

  async delete(id: string): Promise<void> {
    this.challenges = this.challenges.filter(
      (challenge) => challenge.id !== id,
    );
  }
}
