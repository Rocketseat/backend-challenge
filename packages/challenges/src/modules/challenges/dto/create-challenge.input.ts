import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { IChallenge } from '../interfaces/IChallenge.interface';

@InputType()
export class CreateChallengeInput implements Partial<IChallenge> {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  description: string;
}
