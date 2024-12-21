import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeResolver } from './challenge.resolver';
import { ChallengeService } from './challenge.service';

describe('ChallengeResolver', () => {
  let resolver: ChallengeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengeResolver, ChallengeService],
    }).compile();

    resolver = module.get<ChallengeResolver>(ChallengeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
