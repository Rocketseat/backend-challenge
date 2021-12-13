import { Test, TestingModule } from '@nestjs/testing';
import { Status } from '../../enums/Status.enum';
import { AnswerInMemoryRepository } from '../../repositories/inMemory/AnswerInMemory.repository';
import { AnswerRepository } from '../../repositories/prisma/Answer.repository';
import { UpdateAnswerUseCase } from './UpdateAnswer.useCase';

describe('Update Answer Use Case', () => {
  let updateAnswerUseCase: UpdateAnswerUseCase;
  let answerRepository: AnswerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateAnswerUseCase,
        {
          provide: AnswerRepository,
          useClass: AnswerInMemoryRepository,
        },
      ],
    }).compile();

    updateAnswerUseCase = module.get<UpdateAnswerUseCase>(UpdateAnswerUseCase);
    answerRepository = module.get<AnswerRepository>(AnswerRepository);
  });

  it('should be defined', () => {
    expect(updateAnswerUseCase).toBeDefined();
  });

  it('should be update answer', async () => {
    const answer = await answerRepository.create({
      challengeId: '1',
      grade: null,
      link: 'https://www.github.com/jorge-lba/ignite-tests-challenge',
      status: Status.Pending,
    });

    const expectedAnswerUpdatedValues = {
      grade: 8,
      status: Status.Done,
    };

    await updateAnswerUseCase.execute({
      ...expectedAnswerUpdatedValues,
      submissionId: answer.id,
    });

    const updatedAnswer = await answerRepository.findById(answer.id);

    expect(updatedAnswer).toEqual(
      expect.objectContaining(expectedAnswerUpdatedValues),
    );
  });
});
