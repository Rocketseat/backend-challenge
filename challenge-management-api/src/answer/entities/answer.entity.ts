import { ObjectType, Field, Float } from '@nestjs/graphql';
import { AnswerStatus } from '@prisma/client';
import { Challenge } from '../../challenge/entities/challenge.entity';
import { AnswerStatusScalarType } from '../../utils/custom-scalar-types';

@ObjectType()
export class Answer {
  @Field(() => String)
  id: string;

  @Field(() => String)
  challengeId: string;

  @Field(() => Challenge)
  challenge: Challenge;

  @Field(() => String)
  repositoryUrl: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Float)
  score: number;

  @Field(() => AnswerStatusScalarType)
  status: AnswerStatus;

  @Field(() => String)
  errorMessage: string;
}
