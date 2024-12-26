import { KafkaJS } from '@confluentinc/kafka-javascript';
import { Inject, Module, OnModuleInit } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: () => {
        return new KafkaJS.Kafka({
          'bootstrap.servers': 'localhost:9092',
        }).producer();
      },
    },
  ],
  exports: ['KAFKA_PRODUCER'],
})
export class KafkaModule implements OnModuleInit {
  constructor(
    @Inject('KAFKA_PRODUCER') private kafkaProducer: KafkaJS.Producer,
  ) {}
  async onModuleInit() {
    await this.kafkaProducer.connect();
  }
}
