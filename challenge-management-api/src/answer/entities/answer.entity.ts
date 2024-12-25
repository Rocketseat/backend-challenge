import { ObjectType, Field, Float } from '@nestjs/graphql';
import { AnswerStatus } from '@prisma/client';
import { Challenge } from '../../challenge/entities/challenge.entity';
import { AnswerStatusScalarType } from '../../utils/custom-scalar-types';

@ObjectType()
export class Answer {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  challengeId?: string;

  @Field(() => Challenge, { nullable: true })
  challenge?: Challenge;

  @Field(() => String)
  repositoryUrl: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Float, { nullable: true })
  score?: number;

  @Field(() => AnswerStatusScalarType)
  status: AnswerStatus;

  @Field(() => String, { nullable: true })
  errorMessage?: string;
}
