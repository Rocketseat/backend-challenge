import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeInMemoryRepository } from '../../repositories/inMemory/ChallengeInMemory.repository';
import { ChallengeRepository } from '../../repositories/prisma/Challenge.repository';
import { CreateChallengeUseCase } from './CreateChallenge.useCase';

describe('Create Challenge UseCase', () => {
  let useCase: CreateChallengeUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateChallengeUseCase,
        {
          provide: ChallengeRepository,
          useClass: ChallengeInMemoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateChallengeUseCase>(CreateChallengeUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should be create a challenge', async () => {
    const challenge = {
      title: 'test',
      description: 'test',
    };

    const response = await useCase.execute(challenge);

    const expected = {
      ...challenge,
      id: expect.any(String),
    };

    expect(response).toBeDefined();
    expect(response.createdAt).toBeDefined();
    expect(response).toMatchObject(expected);
  });
});
