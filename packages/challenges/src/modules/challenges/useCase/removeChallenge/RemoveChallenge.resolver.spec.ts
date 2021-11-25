import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeInMemoryRepository } from '../../repositories/inMemory/ChallengeInMemory.repository';
import { ChallengeRepository } from '../../repositories/prisma/Challenge.repository';
import { RemoveChallengeResolver } from './RemoveChallenge.resolver';
import { RemoveChallengeUseCase } from './RemoveChallenge.useCase';

describe('Remove Challenge Resolver', () => {
  let resolver: RemoveChallengeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveChallengeResolver,
        RemoveChallengeUseCase,
        {
          provide: ChallengeRepository,
          useClass: ChallengeInMemoryRepository,
        },
      ],
    }).compile();

    resolver = module.get<RemoveChallengeResolver>(RemoveChallengeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
