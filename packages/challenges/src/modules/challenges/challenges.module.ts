import { Module } from '@nestjs/common';
import { ChallengeRepository } from './repositories/prisma/Challenge.repository';
import { CreateChallengeUseCase } from './useCase/createChallenge/CreateChallenge.useCase';
import { CreateChallengeUseCaseResolver } from './useCase/createChallenge/CreateChallenge.resolver';
import { RemoveChallengeUseCase } from './useCase/removeChallenge/RemoveChallenge.useCase';
import { RemoveChallengeResolver } from './useCase/removeChallenge/RemoveChallenge.resolver';
import { UpdateChallengeUseCase } from './useCase/updateChallenge/UpdateChallenge.useCase';
import { UpdateChallengeResolver } from './useCase/updateChallenge/UpdateChallenge.resolver';

@Module({
  providers: [
    ChallengeRepository,
    CreateChallengeUseCaseResolver,
    RemoveChallengeResolver,
    UpdateChallengeResolver,
    CreateChallengeUseCase,
    RemoveChallengeUseCase,
    UpdateChallengeUseCase,
  ],
})
export class ChallengesModule {}
