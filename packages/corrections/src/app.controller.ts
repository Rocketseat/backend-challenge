import { Controller, Inject, Injectable } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

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
@Injectable()
export class AppController {
  constructor(
    @Inject('KAFKA_PRODUCER')
    private readonly producer: ClientKafka,
  ) {}
  @MessagePattern('challenge.correction')
  correctLesson(
    @Payload() message: CorrectLessonMessage,
  ): CorrectLessonResponse {
    const { submissionId, repositoryUrl } = message.value;

    const lessonResponse: CorrectLessonResponse = {
      submissionId,
      repositoryUrl,
      grade: Math.floor(Math.random() * 10) + 1,
      status: 'Done',
    };

    this.producer
      .send('challenge.corrected', JSON.stringify(lessonResponse))
      .toPromise();

    return lessonResponse;
  }
}
