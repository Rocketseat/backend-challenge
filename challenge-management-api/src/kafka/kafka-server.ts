import { Logger } from '@nestjs/common';
import { KafkaJS } from '@confluentinc/kafka-javascript';
import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { KafkaContext } from './kafka-context';

export class KafkaServer extends Server implements CustomTransportStrategy {
  public readonly logger = new Logger(KafkaServer.name);

  private instance: KafkaJS.Kafka;
  private consumer: KafkaJS.Consumer;

  constructor(
    private readonly options: {
      server: KafkaJS.CommonConstructorConfig;
      consumer: KafkaJS.ConsumerConstructorConfig;
    },
  ) {
    super();
  }

  async listen(callback: () => void) {
    this.instance = new KafkaJS.Kafka(this.options.server);
    this.consumer = this.instance.consumer(this.options.consumer);

    await this.consumer.connect();
    await this.bindEvents();

    callback();
  }

  async close() {
    await this.consumer.disconnect();
  }

  public async bindEvents() {
    const registeredPatterns = [...this.messageHandlers.keys()];
    if (registeredPatterns.length > 0) {
      await this.consumer.subscribe({
        topics: registeredPatterns,
      });
    }

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const handler = this.getHandlerByPattern(topic);
        if (!handler) {
          this.logger.error(`No hander for pattern ${topic}`);
          return;
        }

        const context = new KafkaContext(
          message,
          JSON.parse(message.value.toString()),
          topic,
          partition,
          this.consumer,
        );
        await handler(context);
      },
    });
  }
}
