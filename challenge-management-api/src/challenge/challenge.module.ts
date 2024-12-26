import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeResolver } from './challenge.resolver';
import { ChallengePrismaRepository } from './repositories/implementations/challenge.prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    ChallengeResolver,
    ChallengeService,
    PrismaService,
    { provide: 'ChallengeRepository', useClass: ChallengePrismaRepository },
  ],
})
export class ChallengeModule {}
