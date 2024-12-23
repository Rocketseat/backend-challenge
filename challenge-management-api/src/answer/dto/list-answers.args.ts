import { ArgsType, Field } from '@nestjs/graphql';
import { AnswerStatus } from '@prisma/client';
import { AnswerStatusScalarType } from 'src/utils/custom-scalar-types';

@ArgsType()
export class ListAnswersArgs {
  @Field({ nullable: true })
  page?: number;

  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  challengeId?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field(() => AnswerStatusScalarType, { nullable: true })
  status?: AnswerStatus;
}
