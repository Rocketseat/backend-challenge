import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientKafka } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: () => {
        return new ClientKafka({
          client: {
            brokers: ['localhost:9092'],
          },
          producer: {
            allowAutoTopicCreation: true,
          },
        });
      },
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(@Inject('KAFKA_PRODUCER') private producer: ClientKafka) {}
  async onModuleInit() {
    this.producer.subscribeToResponseOf('challenge.corrected');
    await this.producer.connect();
  }
}
