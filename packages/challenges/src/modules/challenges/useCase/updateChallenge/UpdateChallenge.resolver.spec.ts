import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeInMemoryRepository } from '../../repositories/inMemory/ChallengeInMemory.repository';
import { ChallengeRepository } from '../../repositories/prisma/Challenge.repository';
import { UpdateChallengeResolver } from './UpdateChallenge.resolver';
import { UpdateChallengeUseCase } from './UpdateChallenge.useCase';

describe('Update Challenge Resolver', () => {
  let resolver: UpdateChallengeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateChallengeResolver,
        UpdateChallengeUseCase,
        {
          provide: ChallengeRepository,
          useClass: ChallengeInMemoryRepository,
        },
      ],
    }).compile();

    resolver = module.get<UpdateChallengeResolver>(UpdateChallengeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
