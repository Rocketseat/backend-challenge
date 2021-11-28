import { Test, TestingModule } from '@nestjs/testing';
import { GitHubProvider } from '../../../../providers/GitHub.provider';
import { HttpModule } from '@nestjs/axios';
import { UseCaseError } from '../../../../errors/UseCase.error';
import { ChallengeInMemoryRepository } from '../../../challenges/repositories/inMemory/ChallengeInMemory.repository';
import { ChallengeRepository } from '../../../challenges/repositories/prisma/Challenge.repository';
import { IAnswer } from '../../interfaces/IAnswer.interface';
import { AnswerInMemoryRepository } from '../../repositories/inMemory/AnswerInMemory.repository';
import { AnswerRepository } from '../../repositories/prisma/Answer.repository';
import { SendAnswerUseCase } from './SendAnswer.useCase';
import { ConfigModule } from '@nestjs/config';
import { GitHubProviderMock } from '../../../../providers/__mocks__/GitHubMock.providers';

describe('Send Answer Use Case', () => {
  let sendAnswerUseCase: SendAnswerUseCase;
  let challengeRepository: ChallengeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
      ],
      providers: [
        SendAnswerUseCase,
        {
          provide: ChallengeRepository,
          useClass: ChallengeInMemoryRepository,
        },
        {
          provide: AnswerRepository,
          useClass: AnswerInMemoryRepository,
        },
        {
          provide: GitHubProvider,
          useClass: GitHubProviderMock,
        },
      ],
    }).compile();

    sendAnswerUseCase = module.get<SendAnswerUseCase>(SendAnswerUseCase);
    challengeRepository = module.get<ChallengeRepository>(ChallengeRepository);
  });

  it('should be defined', () => {
    expect(sendAnswerUseCase).toBeDefined();
  });

  it('should be sending answer', async () => {
    const challenge = await challengeRepository.create({
      title: 'Send first answer',
      description: 'Send first answer',
    });

    const answer = {
      challengeId: challenge.id,
      link: 'https://github.com/jorge-lba/ignite-tests-challenge',
    } as IAnswer;

    const response = await sendAnswerUseCase.execute(answer);

    const expectedResponse = {
      id: expect.any(String),
      challengeId: challenge.id,
      link: answer.link,
      status: 'Pending',
      grade: null,
    };

    expect(response).toEqual(expect.objectContaining(expectedResponse));
  });

  it('should be record the response with error status if the challenge does not exist', async () => {
    const answer = {
      challengeId: 'non-existent-challenge-id',
      link: 'https://github.com/jorge-lba/ignite-tests-challenge',
    } as IAnswer;

    const response = sendAnswerUseCase.execute(answer);

    const expectedAnswer = {
      id: expect.any(String),
      challengeId: null,
      link: answer.link,
      status: 'Error',
      grade: null,
    };

    const expectedError = new UseCaseError(
      ['challengeId is invalid'],
      expectedAnswer,
    );

    await expect(response).rejects.toThrowError(expectedError);
  });

  it('should be record the response with error status if the challenge id is undefined', async () => {
    const answer = {
      link: 'https://github.com/jorge-lba/ignite-tests-challenge',
    } as IAnswer;

    const response = sendAnswerUseCase.execute(answer);

    const expectedAnswer = {
      id: expect.any(String),
      challengeId: null,
      link: answer.link,
      status: 'Error',
      grade: null,
    };

    const expectedError = new UseCaseError(
      ['challengeId is required'],
      expectedAnswer,
    );

    await expect(response).rejects.toThrowError(expectedError);
  });

  it('should be record the response with error status if the link is not from github', async () => {
    const answer = {
      link: 'https://fakehub.com/jorge-lba/ignite-tests-challenge',
    } as IAnswer;

    const response = sendAnswerUseCase.execute(answer);

    const expectedAnswer = {
      id: expect.any(String),
      challengeId: null,
      link: answer.link,
      status: 'Error',
      grade: null,
    };

    const expectedError = new UseCaseError(['link is invalid'], expectedAnswer);

    await expect(response).rejects.toThrowError(expectedError);
  });

  it('should be record the response with error status if the link is invalid repo', async () => {
    const answer = {
      link: 'https://github.com/jorge-lba/invalid-repo',
    } as IAnswer;

    const response = sendAnswerUseCase.execute(answer);

    const expectedAnswer = {
      id: expect.any(String),
      challengeId: null,
      link: answer.link,
      status: 'Error',
      grade: null,
    };

    const expectedError = new UseCaseError(
      ['link is not a repository'],
      expectedAnswer,
    );

    await expect(response).rejects.toThrowError(expectedError);
  });
});
