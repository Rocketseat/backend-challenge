import { Test, TestingModule } from '@nestjs/testing';
import { AnswerInMemoryRepository } from '../../repositories/inMemory/AnswerInMemory.repository';
import { AnswerRepository } from '../../repositories/prisma/Answer.repository';
import { ListAnswersResolver } from './ListAnswers.resolver';
import { ListAnswersUseCase } from './ListAnswers.useCase';

describe('List Answer Resolver', () => {
  let resolver: ListAnswersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListAnswersResolver,
        ListAnswersUseCase,
        {
          provide: AnswerRepository,
          useClass: AnswerInMemoryRepository,
        },
      ],
    }).compile();

    resolver = module.get<ListAnswersResolver>(ListAnswersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
