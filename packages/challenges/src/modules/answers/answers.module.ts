import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GitHubProvider } from 'src/providers/GitHub.provider';
import { SendAnswerUseCase } from './useCases/sendAnswer/SendAnswer.useCase';
import { SendAnswerResolver } from './useCases/sendAnswer/SendAnswer.resolver';
import { AnswerRepository } from './repositories/prisma/Answer.repository';
import { ChallengesModule } from '../challenges/challenges.module';
import { Transport, ClientsModule, ClientKafka } from '@nestjs/microservices';
import { UpdateAnswerUseCase } from './useCases/updateAnswer/UpdateAnswer.useCase';
import { ListAnswersUseCase } from './useCases/listAnswers/ListAnswers.useCase';

@Module({
  imports: [
    HttpModule,
    ChallengesModule,
    ClientsModule.register([
      {
        name: 'answer-kafka',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'answer-producer-' + Date.now(),
          },
        },
      },
    ]),
  ],
  providers: [
    AnswerRepository,
    GitHubProvider,
    SendAnswerUseCase,
    SendAnswerResolver,
    ListAnswersUseCase,
    ClientKafka,
  ],
  controllers: [UpdateAnswerUseCase],
})
export class AnswersModule {}
