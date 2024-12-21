import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateChallengeInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}
