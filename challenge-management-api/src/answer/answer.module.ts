import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { ChallengeService } from '../challenge/challenge.service';
import { AnswerPrismaRepository } from './repositories/implementations/answer.prisma.repository';
import { ChallengePrismaRepository } from 'src/challenge/repositories/implementations/challenge.prisma.repository';

@Module({
  providers: [
    AnswerResolver,
    AnswerService,
    ChallengeService,
    { provide: 'AnswerRepository', useClass: AnswerPrismaRepository },
    { provide: 'ChallengeRepository', useClass: ChallengePrismaRepository },
  ],
})
export class AnswerModule {}
