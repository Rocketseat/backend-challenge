import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'correction',
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'correction-consumer' + Math.random(),
        },
      },
    },
  ])],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
