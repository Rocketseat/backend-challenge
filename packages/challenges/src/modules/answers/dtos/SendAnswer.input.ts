import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { ICreateAnswerInput } from '../repositories/IAnswer.repository';

@InputType()
export class SendAnswerInput implements Partial<ICreateAnswerInput> {
  @Field()
  @IsString()
  challengeId: string;

  @Field()
  @IsString()
  link: string;
}
