import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { PaginationInput } from '../../challenges/dto/pagination.input';
import { FilterAnswersInput } from './FilterAnswers.input';

@InputType()
export class ListAnswersInput {
  @Field({ nullable: true })
  @IsOptional()
  filter?: FilterAnswersInput;

  @Field({ nullable: true })
  @IsOptional()
  pagination?: PaginationInput;
}
