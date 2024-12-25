import { Test, TestingModule } from '@nestjs/testing';
import { AnswerService } from './answer.service';
import { AnswerFakeRepository } from './repositories/implementations/answer.fake.repository';
import { ChallengeFakeRepository } from '../challenge/repositories/implementations/challenge.fake.repository';

describe('AnswerService', () => {
  let service: AnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswerService,
        { provide: 'AnswerRepository', useClass: AnswerFakeRepository },
        { provide: 'ChallengeRepository', useClass: ChallengeFakeRepository },
      ],
    }).compile();

    service = module.get<AnswerService>(AnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
