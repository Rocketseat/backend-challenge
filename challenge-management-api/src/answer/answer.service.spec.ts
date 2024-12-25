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
    jest.spyOn(global, "fetch").mockImplementationOnce(
        jest.fn(() => Promise.resolve({
          ok: true
        })) as jest.Mock
    )
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
    });
  });
});
