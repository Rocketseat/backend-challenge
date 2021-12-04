import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

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
export class AppController implements OnModuleInit {
  private producer: Producer

  constructor(
    @Inject('correction')
    private readonly clientKafka: ClientKafka
  ){}

  async onModuleInit() {
    this.producer = await this.clientKafka.connect();
  }

  @MessagePattern('challenge.correction')
  correctLesson(
    @Payload() message: CorrectLessonMessage,
  ): void {
    const { submissionId, repositoryUrl } = message.value;

    this.producer.send({
      topic: 'answer.correction',
      messages: [
        {
          key: submissionId,
          value: JSON.stringify({
            submissionId,
            repositoryUrl,
            grade: Math.floor(Math.random() * 10) + 1,
            status: 'Done',
          } as CorrectLessonResponse),
        },
      ],
    });
  }
}
