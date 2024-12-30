import { Controller, Logger } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { KafkaContext } from 'src/kafka/kafka-context';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AnswerConsumer {
  private logger = new Logger(AnswerConsumer.name);

  constructor(private readonly answerService: AnswerService) {}

  @MessagePattern('challenge.corrected')
  async challengeCorrected(@Payload() payload: KafkaContext) {
    this.logger.log(`Received message from topic: ${payload.topic}`);
    console.log(payload);
  }
}
