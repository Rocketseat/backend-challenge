import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IChallenge } from '../interfaces/IChallenge.interface';

@ObjectType()
export class Challenge implements IChallenge {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  createdAt: Date;
}
