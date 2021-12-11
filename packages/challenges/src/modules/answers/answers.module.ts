import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GitHubProvider } from '../../providers/GitHub.provider';
import { SendAnswerUseCase } from './useCases/sendAnswer/SendAnswer.useCase';
import { SendAnswerResolver } from './useCases/sendAnswer/SendAnswer.resolver';
import { AnswerRepository } from './repositories/prisma/Answer.repository';
import { ChallengesModule } from '../challenges/challenges.module';
import { Transport, ClientsModule, ClientKafka } from '@nestjs/microservices';
import { UpdateAnswerUseCase } from './useCases/updateAnswer/UpdateAnswer.useCase';
import { ListAnswersUseCase } from './useCases/listAnswers/ListAnswers.useCase';
import { ListAnswersResolver } from './useCases/listAnswers/ListAnswers.resolver';
import { UpdateAnswerController } from './useCases/updateAnswer/UpdateAnswer.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ChallengesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ClientsModule.register([
      {
        name: 'answer-kafka',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER],
          },
          consumer: {
            groupId: 'answer-consumer',
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
    ListAnswersResolver,
    UpdateAnswerUseCase,
    ClientKafka,
  ],
  controllers: [UpdateAnswerController],
  exports: [AnswerRepository],
})
export class AnswersModule {}
