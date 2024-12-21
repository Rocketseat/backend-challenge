import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeResolver } from './challenge.resolver';

@Module({
  providers: [ChallengeResolver, ChallengeService],
})
export class ChallengeModule {}
