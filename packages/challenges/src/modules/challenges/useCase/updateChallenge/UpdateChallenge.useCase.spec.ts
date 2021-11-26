import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeInMemoryRepository } from '../../repositories/inMemory/ChallengeInMemory.repository';
import { ChallengeRepository } from '../../repositories/prisma/Challenge.repository';
import { UpdateChallengeUseCase } from './UpdateChallenge.useCase';

describe('Update Challenge Use Case', () => {
  let updateUseCase: UpdateChallengeUseCase;
  let challengeRepository: ChallengeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateChallengeUseCase,
        {
          provide: ChallengeRepository,
          useClass: ChallengeInMemoryRepository,
        },
      ],
    }).compile();

    updateUseCase = module.get<UpdateChallengeUseCase>(UpdateChallengeUseCase);

    challengeRepository = module.get<ChallengeRepository>(ChallengeRepository);
  });

  it('should be defined', () => {
    expect(updateUseCase).toBeDefined();
  });

  it('should update a challenge', async () => {
    const challengeCreated = await challengeRepository.create({
      title: 'Test Update Challenge',
      description: 'should update a challenge',
    });

    const challengeData = {
      title: 'Test Update Challenge Updated',
      description: 'should update a challenge',
    };

    const challengeUpdated = await updateUseCase.execute(
      challengeCreated.id,
      challengeData,
    );

    expect(challengeUpdated.createdAt).toBeDefined();
    expect(challengeUpdated).toEqual(
      expect.objectContaining({
        ...challengeData,
        id: expect.any(String),
      }),
    );
  });

  it("should be returning an error if the challenge doesn't exist", async () => {
    const response = updateUseCase.execute('non-existent-id', {
      title: 'Test Update Challenge',
      description: 'should update a challenge',
    });

    await expect(response).rejects.toThrowError('Challenge not found');
  });

  it('should be possible to update the title of a challenge', async () => {
    const challengeCreated = await challengeRepository.create({
      title: 'Test Update Challenge',
      description: 'should update a challenge',
    });

    const challengeData = {
      title: 'Test Update Challenge Updated',
    };

    const challengeUpdated = await updateUseCase.execute(
      challengeCreated.id,
      challengeData,
    );

    expect(challengeUpdated.createdAt).toBeDefined();
    expect(challengeUpdated).toEqual(
      expect.objectContaining({
        ...challengeData,
        id: expect.any(String),
      }),
    );
  });

  it("should be possible to update a challenge's descriptions", async () => {
    const challengeCreated = await challengeRepository.create({
      title: 'Test Update Challenge',
      description: 'should update a challenge',
    });

    const challengeData = {
      description: 'should update a challenge updated',
    };

    const challengeUpdated = await updateUseCase.execute(
      challengeCreated.id,
      challengeData,
    );

    expect(challengeUpdated.createdAt).toBeDefined();
    expect(challengeUpdated).toEqual(
      expect.objectContaining({
        ...challengeData,
        id: expect.any(String),
      }),
    );
  });
});
