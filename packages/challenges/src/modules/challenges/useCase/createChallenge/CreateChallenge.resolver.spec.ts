import { Test, TestingModule } from '@nestjs/testing';
import { CreateChallengeUseCaseResolver } from './CreateChallenge.resolver';
import { ChallengeInMemoryRepository } from '../../repositories/inMemory/ChallengeInMemory.repository';
import { ChallengeRepository } from '../../repositories/prisma/Challenge.repository';
import { CreateChallengeUseCase } from './CreateChallenge.useCase';

describe('Create Challenge Use Case Resolver', () => {
  let resolver: CreateChallengeUseCaseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateChallengeUseCaseResolver,
        CreateChallengeUseCase,
        {
          provide: ChallengeRepository,
          useClass: ChallengeInMemoryRepository,
        },
      ],
    }).compile();

    resolver = module.get<CreateChallengeUseCaseResolver>(
      CreateChallengeUseCaseResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
