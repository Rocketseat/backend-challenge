import { KafkaJS } from '@confluentinc/kafka-javascript';

export class KafkaContext {
  constructor(
    readonly message: KafkaJS.Message,
    readonly value: any,
    readonly topic: string,
    readonly partition: number,
    readonly consumer: KafkaJS.Consumer,
  ) {}
}
