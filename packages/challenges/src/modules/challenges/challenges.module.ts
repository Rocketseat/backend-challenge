import { Module } from '@nestjs/common';
import { ChallengeRepository } from './repositories/prisma/Challenge.repository';
import { CreateChallengeUseCase } from './useCase/createChallenge/CreateChallenge.useCase';
import { CreateChallengeUseCaseResolver } from './useCase/createChallenge/CreateChallenge.resolver';
import { RemoveChallengeUseCase } from './useCase/removeChallenge/RemoveChallenge.useCase';
import { RemoveChallengeResolver } from './useCase/removeChallenge/RemoveChallenge.resolver';
import { UpdateChallengeUseCase } from './useCase/updateChallenge/UpdateChallenge.useCase';
import { UpdateChallengeResolver } from './useCase/updateChallenge/UpdateChallenge.resolver';
import { ListChallengesResolver } from './useCase/listChallenges/ListChallenges.resolver';
import { ListChallengesUseCase } from './useCase/listChallenges/ListChallenges.useCase';

@Module({
  providers: [
    ChallengeRepository,
    CreateChallengeUseCaseResolver,
    RemoveChallengeResolver,
    UpdateChallengeResolver,
    ListChallengesResolver,
    CreateChallengeUseCase,
    RemoveChallengeUseCase,
    UpdateChallengeUseCase,
    ListChallengesUseCase,
  ],
})
export class ChallengesModule {}
