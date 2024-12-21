import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class ListChallengesArgs {
  @Field({ nullable: true })
  page?: number;

  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;
}
