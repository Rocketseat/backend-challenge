import { Test, TestingModule } from '@nestjs/testing';
import { AnswerInMemoryRepository } from '../../repositories/inMemory/AnswerInMemory.repository';
import { AnswerRepository } from '../../repositories/prisma/Answer.repository';
import { UpdateAnswerController } from './UpdateAnswer.controller';
import { UpdateAnswerUseCase } from './UpdateAnswer.useCase';

describe('Update Answer Resolver', () => {
  let controller: UpdateAnswerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateAnswerController,
        UpdateAnswerUseCase,
        {
          provide: AnswerRepository,
          useClass: AnswerInMemoryRepository,
        },
      ],
    }).compile();

    controller = module.get<UpdateAnswerController>(UpdateAnswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
