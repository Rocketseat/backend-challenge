import { ObjectType, Field } from '@nestjs/graphql';
import { Challenge } from '../entities/challenge.entity';
import { Pagination } from './pagination.typeObject';

@ObjectType()
export class PaginatedChallenges {
  @Field(() => [Challenge])
  challenges: Challenge[];

  @Field(() => Pagination)
  pagination: Pagination;
}
