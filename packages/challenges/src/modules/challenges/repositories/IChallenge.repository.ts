import { IChallenge } from '../interfaces/IChallenge.interface';

export interface IChallengeRepository {
  create(challenge: Partial<IChallenge>): Promise<IChallenge>;
  findById(id: string): Promise<IChallenge>;
  removeById(id: string): Promise<boolean>;
  updateById(
    challengeId: string,
    challenge: Partial<IChallenge>,
  ): Promise<IChallenge>;
}
