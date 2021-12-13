import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pagination } from 'src/core/domain/Pagination.interface';

@ObjectType()
export class PaginationTypeObject implements Pagination {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  totalItems: number;

  @Field(() => Boolean)
  containsNextPage: boolean;
}
