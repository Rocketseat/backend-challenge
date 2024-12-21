import { CreateChallengeInput } from './create-challenge.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChallengeInput extends PartialType(CreateChallengeInput) {
  @Field(() => String)
  id: string;
}
