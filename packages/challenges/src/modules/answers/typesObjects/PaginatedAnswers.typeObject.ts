import { ObjectType, Field } from '@nestjs/graphql';
import { Answer } from '../entities/Answer.entity';
import { Pagination } from '../../challenges/typesObjects/pagination.typeObject';

@ObjectType()
export class PaginatedAnswers {
  @Field(() => [Answer])
  answers: Answer[];

  @Field(() => Pagination)
  pagination: Pagination;
}
