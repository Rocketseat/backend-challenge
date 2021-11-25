import { Injectable } from '@nestjs/common';
import { CreateChallengeInput } from '../../dto/create-challenge.input';
import { IChallengeRepository } from '../IChallenge.repository';

@Injectable()
export class ChallengeRepository implements IChallengeRepository {
  private _challenges: CreateChallengeInput[] = [];

  async create(createChallengeInput: CreateChallengeInput) {
    const challenge = {
      ...createChallengeInput,
      id: `${Number(this._challenges.length) + 1}`,
      createdAt: new Date(),
    };

    this._challenges.push(challenge);

    return challenge;
  }
}
