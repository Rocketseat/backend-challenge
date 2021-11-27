import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeInMemoryRepository } from '../../repositories/inMemory/ChallengeInMemory.repository';
import { ChallengeRepository } from '../../repositories/prisma/Challenge.repository';
import { ListChallengesResolver } from './ListChallenges.resolver';
import { ListChallengesUseCase } from './ListChallenges.useCase';

describe('List Challenge Resolver', () => {
  let resolver: ListChallengesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListChallengesResolver,
        ListChallengesUseCase,
        {
          provide: ChallengeRepository,
          useClass: ChallengeInMemoryRepository,
        },
      ],
    }).compile();

    resolver = module.get<ListChallengesResolver>(ListChallengesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
