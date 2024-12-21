import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeService } from './challenge.service';

describe('ChallengeService', () => {
  let service: ChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengeService],
    }).compile();

    service = module.get<ChallengeService>(ChallengeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
