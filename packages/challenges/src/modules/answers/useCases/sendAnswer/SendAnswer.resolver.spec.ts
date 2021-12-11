import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { SendAnswerResolver } from './SendAnswer.resolver';
import { AnswerInMemoryRepository } from '../../repositories/inMemory/AnswerInMemory.repository';
import { AnswerRepository } from '../../repositories/prisma/Answer.repository';
import { SendAnswerUseCase } from './SendAnswer.useCase';
import { ChallengeRepository } from '../../../challenges/repositories/prisma/Challenge.repository';
import { ChallengeInMemoryRepository } from '../../../challenges/repositories/inMemory/ChallengeInMemory.repository';
import { GitHubProvider } from '../../../../providers/GitHub.provider';
import { GitHubProviderMock } from '../../../../providers/__mocks__/GitHubMock.providers';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

describe('Send Answer Resolver', () => {
  let resolver: SendAnswerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot(),
        ClientsModule.register([
          {
            name: 'answer-kafka',
          },
        ]),
      ],
      providers: [
        SendAnswerResolver,
        SendAnswerUseCase,
        {
          provide: AnswerRepository,
          useClass: AnswerInMemoryRepository,
        },
        {
          provide: ChallengeRepository,
          useClass: ChallengeInMemoryRepository,
        },
        {
          provide: GitHubProvider,
          useClass: GitHubProviderMock,
        },
      ],
    }).compile();

    resolver = module.get<SendAnswerResolver>(SendAnswerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
