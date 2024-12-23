import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { ChallengeService } from '../challenge/challenge.service';

@Module({
  providers: [AnswerResolver, AnswerService, ChallengeService],
})
export class AnswerModule {}
