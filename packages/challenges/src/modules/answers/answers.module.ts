import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GitHubProvider } from 'src/providers/GitHub.provider';
import { SendAnswerUseCase } from './useCases/sendAnswer/SendAnswer.useCase';
import { SendAnswerResolver } from './useCases/sendAnswer/SendAnswer.resolver';
import { AnswerRepository } from './repositories/prisma/Answer.repository';
import { ChallengesModule } from '../challenges/challenges.module';

@Module({
  imports: [HttpModule, ChallengesModule],
  providers: [
    GitHubProvider,
    SendAnswerUseCase,
    SendAnswerResolver,
    AnswerRepository,
  ],
})
export class AnswersModule {}
