import { CreateChallengeInput } from '../dto/create-challenge.input';
import { ListChallengesRepoArgs } from '../dto/list-challenges.repo.args';
import { UpdateChallengeInput } from '../dto/update-challenge.input';
import { Challenge } from '../entities/challenge.entity';

export interface ChallengeRepository {
  create(input: CreateChallengeInput): Promise<Challenge>;
  findOne(id: string): Promise<Challenge>;
  findByTitle(title: string): Promise<Challenge>;
  findMany(args: ListChallengesRepoArgs): Promise<Challenge[]>;
  update(input: UpdateChallengeInput): Promise<Challenge>;
  delete(id: string): Promise<void>;
}
