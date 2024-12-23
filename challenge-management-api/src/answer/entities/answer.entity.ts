import { ObjectType, Field, Float } from '@nestjs/graphql';
import { AnswerStatus } from '@prisma/client';
import { Challenge } from 'src/challenge/entities/challenge.entity';
import { AnswerStatusScalarType } from 'src/utils/custom-scalar-types';

@ObjectType()
export class Answer {
  @Field(() => String)
  id: string;

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
}
