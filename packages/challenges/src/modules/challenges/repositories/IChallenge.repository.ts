import { IChallenge } from '../interfaces/IChallenge.interface';

export interface IChallengeRepository {
  create(challenge: Partial<IChallenge>): Promise<IChallenge>;
}
