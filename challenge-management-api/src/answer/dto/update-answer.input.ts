import { AnswerStatusScalarType } from 'src/utils/custom-scalar-types';
import { CreateAnswerInput } from './create-answer.input';
import { InputType, Field, PartialType, Float } from '@nestjs/graphql';
import { AnswerStatus } from '@prisma/client';

@InputType()
export class UpdateAnswerInput extends PartialType(CreateAnswerInput) {
  @Field(() => String)
  id: string;

  @Field(() => Float)
  score: number;

  @Field(() => AnswerStatusScalarType)
  status: AnswerStatus;
}
