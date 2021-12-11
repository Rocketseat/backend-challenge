import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ChallengesModule } from './modules/challenges/challenges.module';
import { ConfigModule } from '@nestjs/config';
import { AnswersModule } from './modules/answers/answers.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    ChallengesModule,
    AnswersModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
