import { InputType, Field } from '@nestjs/graphql';
import { IChallenge } from '../interfaces/IChallenge.interface';

@InputType()
export class CreateChallengeInput implements Partial<IChallenge> {
  @Field()
  title: string;

  @Field()
  description: string;
}
