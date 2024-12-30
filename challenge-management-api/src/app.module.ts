import { Module } from '@nestjs/common';
import { ChallengeModule } from './challenge/challenge.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { AnswerStatusScalarType } from './utils/custom-scalar-types';
import { AnswerModule } from './answer/answer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      resolvers: {
        AnswerStatus: AnswerStatusScalarType,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ChallengeModule,
    PrismaModule,
    AnswerModule,
  ],
})
export class AppModule {}
