import { Controller, Logger } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

interface CorrectLessonResponse {
  submissionId: string;
  repositoryUrl: string;
  grade: number;
  status: 'Done' | 'Error' | 'Pending';
}

@Controller()
export class AnswerConsumer {
  private logger = new Logger(AnswerConsumer.name);

  constructor(private readonly answerService: AnswerService) {}

  @MessagePattern('challenge.corrected')
  async challengeCorrected(@Payload() payload: CorrectLessonResponse) {
    this.logger.log(`Received message from topic`);
    console.log(payload);
  }
}
