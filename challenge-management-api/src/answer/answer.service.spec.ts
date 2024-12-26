import { Test, TestingModule } from '@nestjs/testing';
import { AnswerService } from './answer.service';
import { AnswerFakeRepository } from './repositories/implementations/answer.fake.repository';
import { ChallengeFakeRepository } from '../challenge/repositories/implementations/challenge.fake.repository';
import { AnswerStatus } from '@prisma/client';

describe('AnswerService', () => {
  let service: AnswerService;
  let challengeRepository: ChallengeFakeRepository;
  let answerRepository: AnswerFakeRepository;

  beforeEach(async () => {
    challengeRepository = new ChallengeFakeRepository();
    answerRepository = new AnswerFakeRepository();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswerService,
        { provide: 'AnswerRepository', useValue: answerRepository },
        { provide: 'ChallengeRepository', useValue: challengeRepository },
      ],
    }).compile();

    service = module.get<AnswerService>(AnswerService);
  });

  it('should be able to create an answer to an existing challenge', async () => {
    const challenge = await challengeRepository.create({
      title: 'Test challenge',
      description: 'Test challenge',
    });
    jest.spyOn(global, 'fetch').mockImplementationOnce(
      jest.fn(() =>
        Promise.resolve({
          ok: true,
        }),
      ) as jest.Mock,
    );
    const repositoryUrl = 'https://github.com/example/example.git';
    const answer = await service.create({
      challengeId: challenge.id,
      repositoryUrl,
    });

    expect(answer.id).toBeDefined();
    expect(answer).toMatchObject({
      challengeId: challenge.id,
      status: AnswerStatus.PENDING,
      repositoryUrl,
      errorMessage: null,
    });
  });

  it('should create answer with status ERROR when repositoryUrl is invalid', async () => {
    const challenge = await challengeRepository.create({
      title: 'Test challenge',
      description: 'Test challenge',
    });

    const repositoryUrl = 'https://google.com';
    const answer = await service.create({
      challengeId: challenge.id,
      repositoryUrl,
    });

    expect(answer).toMatchObject({
      status: AnswerStatus.ERROR,
      errorMessage: 'Not a valid github.com repository',
    });
  });

  it('should create answer with status ERROR when repository is not found', async () => {
    const challenge = await challengeRepository.create({
      title: 'Test challenge',
      description: 'Test challenge',
    });
    jest.spyOn(global, 'fetch').mockImplementationOnce(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
        }),
      ) as jest.Mock,
    );

    const repositoryUrl =
      'https://github.com/ivandersr/repo-i-will-never-have34321';
    const answer = await service.create({
      challengeId: challenge.id,
      repositoryUrl,
    });

    expect(answer).toMatchObject({
      status: AnswerStatus.ERROR,
      errorMessage: 'Repository not found',
    });
  });

  it('should create answer with status ERROR when challenge is not found', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(
      jest.fn(() =>
        Promise.resolve({
          ok: true,
        }),
      ) as jest.Mock,
    );
    const repositoryUrl = 'https://github.com/example/example.git';
    const answer = await service.create({
      challengeId: crypto.randomUUID(),
      repositoryUrl,
    });

    expect(answer).toMatchObject({
      status: AnswerStatus.ERROR,
      errorMessage: 'Invalid challenge',
    });
  });

  it('should be able to list answers', async () => {
    const challenge = await challengeRepository.create({
      title: 'Challenge Title 1',
      description: 'Challenge Description 1',
    });
    for (let i = 1; i <= 5; i++) {
      await answerRepository.create({
        challengeId: challenge.id,
        repositoryUrl: 'https://github.com/ivandersr',
        status: AnswerStatus.PENDING,
      });
    }

    const result = await service.findMany({});
    expect(result).toHaveLength(5);
    expect(result[0]).toMatchObject({
      challengeId: challenge.id,
      repositoryUrl: 'https://github.com/ivandersr',
      status: AnswerStatus.PENDING,
    });
  });

  it('should be able to list answers with pagination', async () => {
    const challenge = await challengeRepository.create({
      title: 'Challenge Title 1',
      description: 'Challenge Description 1',
    });
    for (let i = 1; i <= 5; i++) {
      await answerRepository.create({
        challengeId: challenge.id,
        repositoryUrl: 'https://github.com/ivandersr',
        status: AnswerStatus[['PENDING', 'ERROR', 'DONE'][i % 3]],
      });
    }

    const result = await service.findMany({
      page: 3,
      limit: 2,
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      challengeId: challenge.id,
      repositoryUrl: 'https://github.com/ivandersr',
      status: AnswerStatus.DONE,
    });
  });

  it('should be able to list answers with filters', async () => {
    const challenge = await challengeRepository.create({
      title: 'Challenge Title 1',
      description: 'Challenge Description 1',
    });
    for (let i = 1; i <= 5; i++) {
      await answerRepository.create({
        challengeId: challenge.id,
        repositoryUrl: 'https://github.com/ivandersr',
        status: AnswerStatus[['PENDING', 'ERROR', 'DONE'][i % 3]],
      });
    }

    const result = await service.findMany({
      challengeId: challenge.id,
      status: AnswerStatus.PENDING,
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      status: AnswerStatus.PENDING,
    });
  });
});
