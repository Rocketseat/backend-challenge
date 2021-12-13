import { ObjectType, Field } from '@nestjs/graphql';
import { Pagination } from 'src/core/domain/Pagination.interface';
import { Challenge } from '../entities/challenge.entity';
import { PaginationTypeObject } from './pagination.typeObject';

@ObjectType()
export class PaginatedChallenges {
  @Field(() => [Challenge])
  challenges: Challenge[];

  @Field(() => PaginationTypeObject)
  pagination: Pagination;
}
