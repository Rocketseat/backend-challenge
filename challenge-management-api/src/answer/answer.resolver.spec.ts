import { Test, TestingModule } from '@nestjs/testing';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer.service';

describe('AnswerResolver', () => {
  let resolver: AnswerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerResolver, AnswerService],
    }).compile();

    resolver = module.get<AnswerResolver>(AnswerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
