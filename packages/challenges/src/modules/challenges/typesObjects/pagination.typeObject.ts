import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IPagination } from '../interfaces/IPagination.interface';

@ObjectType()
export class Pagination implements IPagination {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  totalChallenges: number;

  @Field(() => Boolean)
  containsNextPage: boolean;
}
