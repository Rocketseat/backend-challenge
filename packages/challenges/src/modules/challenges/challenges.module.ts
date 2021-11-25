import { Module } from '@nestjs/common';
import { ChallengeRepository } from './repositories/prisma/Challenge.repository';
import { CreateChallengeUseCase } from './useCase/createChallenge/CreateChallenge.useCase';
import { CreateChallengeUseCaseResolver } from './useCase/createChallenge/CreateChallenge.resolver';
import { RemoveChallengeUseCase } from './useCase/removeChallenge/RemoveChallenge.useCase';
import { RemoveChallengeResolver } from './useCase/removeChallenge/RemoveChallenge.resolver';

@Module({
  providers: [
    CreateChallengeUseCaseResolver,
    RemoveChallengeResolver,
    ChallengeRepository,
    CreateChallengeUseCase,
    RemoveChallengeUseCase,
  ],
})
export class ChallengesModule {}
