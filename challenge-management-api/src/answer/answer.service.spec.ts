import { Test, TestingModule } from '@nestjs/testing';
import { AnswerService } from './answer.service';

describe('AnswerService', () => {
  let service: AnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerService],
    }).compile();

    service = module.get<AnswerService>(AnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
