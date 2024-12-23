import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field(() => String)
  challengeId: string;

  @Field(() => String)
  repositoryUrl: string;
}
