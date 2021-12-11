import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { Status } from '../enums/Status.enum';

@InputType()
class DateBetween {
  @Field(() => GraphQLISODateTime)
  @IsString()
  start: Date;

  @Field(() => GraphQLISODateTime)
  @IsString()
  end: Date;
}

@InputType()
export class FilterAnswersInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  challengeId?: string;

  @Field(() => Status, { nullable: true })
  @IsOptional()
  @IsString()
  status?: Status;

  @Field({ nullable: true })
  @IsOptional()
  dateBetween?: DateBetween;
}
