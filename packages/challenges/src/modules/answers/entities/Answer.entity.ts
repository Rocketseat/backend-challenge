import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Status } from '../enums/Status.enum';
import { IAnswer } from '../interfaces/IAnswer.interface';

registerEnumType(Status, {
  name: 'Status',
  description: 'Status of the answer',
});

@ObjectType()
export class Answer implements IAnswer {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  challengeId: string;

  @Field()
  link: string;

  @Field(() => Status)
  status: Status;

  @Field({ nullable: true })
  grade: number | null;

  @Field()
  createdAt: Date;
}
