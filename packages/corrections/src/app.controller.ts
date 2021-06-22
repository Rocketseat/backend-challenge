import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

interface CorrectLessonMessage {
  value: {
    submissionId: string;
    repositoryUrl: string;
  };
}

interface CorrectLessonResponse {
  submissionId: string;
  repositoryUrl: string;
  grade: number;
  status: 'Pending' | 'Error' | 'Done';
}

@Controller()
export class AppController {
  @MessagePattern('challenge.correction')
  correctLesson(
    @Payload() message: CorrectLessonMessage,
  ): CorrectLessonResponse {
    const { submissionId, repositoryUrl } = message.value;

    return {
      submissionId,
      repositoryUrl,
      grade: Math.floor(Math.random() * 10) + 1,
      status: 'Done',
    };
  }
}
