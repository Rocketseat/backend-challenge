import { ObjectType, Field } from '@nestjs/graphql';
import { Answer } from '../entities/Answer.entity';
import { PaginationTypeObject } from '../../challenges/typesObjects/pagination.typeObject';
import { Pagination } from 'src/core/domain/Pagination.interface';

@ObjectType()
export class PaginatedAnswers {
  @Field(() => [Answer])
  answers: Answer[];

  @Field(() => PaginationTypeObject)
  pagination: Pagination;
}
