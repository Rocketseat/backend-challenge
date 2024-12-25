import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeService } from './challenge.service';
import { ChallengeFakeRepository } from './repositories/implementations/challenge.fake.repository';

describe('ChallengeService', () => {
  let service: ChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengeService,
        {
          provide: 'ChallengeRepository',
          useClass: ChallengeFakeRepository,
        },
      ],
    }).compile();

    service = module.get<ChallengeService>(ChallengeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new challenge', async () => {
    const challengeInput = {
      title: 'Challenge Title',
      description: 'Challenge Description',
    };
    const challenge = await service.create(challengeInput);
    expect(challenge).toMatchObject(challengeInput);
    expect(challenge.id).toBeDefined();
  });
});
