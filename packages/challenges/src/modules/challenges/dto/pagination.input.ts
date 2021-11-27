import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  page?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  pageSize?: number;
}
