import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'recipe ' })
export class Hello {
  @Field({ nullable: true })
  message?: string;
}
