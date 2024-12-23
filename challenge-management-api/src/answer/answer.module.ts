import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';

@Module({
  providers: [AnswerResolver, AnswerService],
})
export class AnswerModule {}
