import { Pagination } from 'src/core/domain/Pagination.interface';
import { PaginationInput } from '../dto/pagination.input';
import { IChallenge } from '../interfaces/IChallenge.interface';

interface IListAllResponse {
  challenges: IChallenge[];
  pagination: Pagination;
}
export interface IChallengeRepository {
  create(challenge: Partial<IChallenge>): Promise<IChallenge>;
  findById(id: string): Promise<IChallenge>;
  removeById(id: string): Promise<boolean>;
  updateById(
    challengeId: string,
    challenge: Partial<IChallenge>,
  ): Promise<IChallenge>;
  listAll(
    pagination?: PaginationInput,
    search?: string,
  ): Promise<IListAllResponse>;
  idIsValid(id: string): Promise<boolean>;
}
