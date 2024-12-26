import { Logger } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { KafkaContext } from 'src/kafka/kafka-context';
import { MessagePattern } from '@nestjs/microservices';

export class AnswerConsumer {
  private logger = new Logger(AnswerConsumer.name);

  constructor(private readonly answerService: AnswerService) {}

  @MessagePattern('correction')
  async challengeCorrected(payload: KafkaContext) {
    this.logger.log(`Received message from topic: ${payload.topic}`);
    console.log(payload);
  }
}
