import { Controller } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AnswerStatus } from '@prisma/client';

interface CorrectLessonResponse {
  submissionId: string;
  repositoryUrl: string;
  grade: number;
  status: 'Done' | 'Error' | 'Pending';
}

@Controller()
export class AnswerConsumer {
  constructor(private readonly answerService: AnswerService) {}

  @MessagePattern('challenge.corrected')
  async challengeCorrected(@Payload() payload: CorrectLessonResponse) {
    await this.answerService.update({
      id: payload.submissionId,
      score: payload.grade,
      status: payload.status.toUpperCase() as AnswerStatus,
    });
  }
}
