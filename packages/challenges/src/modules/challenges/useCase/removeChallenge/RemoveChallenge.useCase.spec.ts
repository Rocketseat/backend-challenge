import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeInMemoryRepository } from '../../repositories/inMemory/ChallengeInMemory.repository';
import { ChallengeRepository } from '../../repositories/prisma/Challenge.repository';
import { RemoveChallengeUseCase } from './RemoveChallenge.useCase';

describe('Remove Challenge Use Case', () => {
  let removeChallengeUseCase: RemoveChallengeUseCase;
  let challengeRepository: ChallengeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveChallengeUseCase,
        {
          provide: ChallengeRepository,
          useClass: ChallengeInMemoryRepository,
        },
      ],
    }).compile();

    removeChallengeUseCase = module.get<RemoveChallengeUseCase>(
      RemoveChallengeUseCase,
    );

    challengeRepository = module.get<ChallengeRepository>(ChallengeRepository);
  });

  it('should be defined', () => {
    expect(removeChallengeUseCase).toBeDefined();
  });

  it('should be removing one challenge by id', async () => {
    const challengeData = {
      title: 'Remove Challenge',
      description: 'should be removing one challenge by id',
    };

    const challengeCreated = await challengeRepository.create(challengeData);

    const response = await removeChallengeUseCase.execute(challengeCreated.id);

    const challenge = await challengeRepository.findById(challengeCreated.id);

    expect(response).toBe(true);
    expect(challenge).toBeUndefined();
  });

  it("should be returning an error if the challenge doesn't exist", async () => {
    const response = removeChallengeUseCase.execute('non-existent-id');

    await expect(response).rejects.toThrowError('Challenge not found');
  });
});
