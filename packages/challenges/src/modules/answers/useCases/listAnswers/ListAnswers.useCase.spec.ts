import { Test, TestingModule } from '@nestjs/testing';
import { Status } from '../../enums/Status.enum';
import { IAnswerRepository } from '../../repositories/IAnswer.repository';
import { AnswerInMemoryRepository } from '../../repositories/inMemory/AnswerInMemory.repository';
import { AnswerRepository } from '../../repositories/prisma/Answer.repository';
import { ListAnswersUseCase } from './ListAnswers.useCase';

describe('List Answers Use Case', () => {
  let answerRepository: IAnswerRepository;
  let listAnswersUseCase: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ListAnswersUseCase,
        {
          provide: AnswerRepository,
          useClass: AnswerInMemoryRepository,
        },
      ],
    }).compile();

    answerRepository = module.get<IAnswerRepository>(AnswerRepository);
    listAnswersUseCase = module.get<ListAnswersUseCase>(ListAnswersUseCase);
  });

  it('should be defined', () => {
    expect(listAnswersUseCase).toBeDefined();
  });

  it('should be list all answers', async () => {
    const [firstAnswer, secondAnswer] = await Promise.all([
      answerRepository.create({
        challengeId: '1',
        link: 'https://github.com/jorge-lba/ignite-tests-challenge',
        grade: 8,
        status: Status.Done,
      }),
      answerRepository.create({
        challengeId: '2',
        link: 'https://github.com/',
        grade: null,
        status: Status.Error,
      }),
    ]);

    const answers = await listAnswersUseCase.execute();

    expect(answers).toEqual([firstAnswer, secondAnswer]);
  });

  it('should be filter answers by challenger id', async () => {
    const [firstAnswer] = await Promise.all([
      answerRepository.create({
        challengeId: '1',
        link: 'https://github.com/jorge-lba/ignite-tests-challenge',
        grade: 8,
        status: Status.Done,
      }),
      answerRepository.create({
        challengeId: '2',
        link: 'https://github.com/',
        grade: null,
        status: Status.Error,
      }),
    ]);

    const answers = await listAnswersUseCase.execute({
      filter: {
        challengeId: '1',
      },
    });

    expect(answers).toEqual([firstAnswer]);
  });

  it('should be filter answers by status', async () => {
    const [, secondAnswer] = await Promise.all([
      answerRepository.create({
        challengeId: '1',
        link: 'https://github.com/jorge-lba/ignite-tests-challenge',
        grade: 8,
        status: Status.Done,
      }),
      answerRepository.create({
        challengeId: '2',
        link: 'https://github.com/',
        grade: null,
        status: Status.Error,
      }),
    ]);

    const answers = await listAnswersUseCase.execute({
      filter: {
        status: Status.Error,
      },
    });

    expect(answers).toEqual([secondAnswer]);
  });

  it('should be filter answers by date between', async () => {
    const [, , , answerNotExpected] = await Promise.all(
      ['2020-01-01', '2020-01-15', '2020-02-01', '2020-03-01'].map(
        (date, index) =>
          answerRepository.create({
            challengeId: `${index}`,
            link: 'https://github.com/jorge-lba/ignite-tests-challenge',
            grade: Math.floor(Math.random() * 10) + 1,
            status: Status[Math.floor(Math.random() * 2) + 1],
            createdAt: new Date(date),
          }),
      ),
    );

    const answers = await listAnswersUseCase.execute({
      filter: {
        dateBetween: {
          start: '2020-01-01',
          end: '2020-02-01',
        },
      },
    });

    expect(answers).not.toEqual(expect.arrayContaining([answerNotExpected]));
  });
});
