import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { HelloModule } from './modules/hello/hello.module';

@Module({
  imports: [
    HelloModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: '../schema.gql',
    }),
  ],
})
export class AppModule {}
