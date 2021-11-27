import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { HelloModule } from './modules/hello/hello.module';
import { ChallengesModule } from './modules/challenges/challenges.module';

@Module({
  imports: [
    HelloModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    ChallengesModule,
  ],
})
export class AppModule {}
