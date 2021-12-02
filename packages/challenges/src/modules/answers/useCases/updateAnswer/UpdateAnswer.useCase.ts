import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Status } from '../../enums/Status.enum';
import { AnswerRepository } from '../../repositories/prisma/Answer.repository';

interface IUpdateAnswerInput {
  submissionId: string;
  grade: number;
  status: Status;
}

interface IKafkaMessage {
  value: IUpdateAnswerInput;
}

@Controller()
export class UpdateAnswerUseCase {
  constructor(private readonly answerRepository: AnswerRepository) {}

  @MessagePattern('answer.correction')
  async execute(@Payload() { value }: IKafkaMessage) {
    await this.answerRepository.updateById(value.submissionId, {
      grade: value.grade,
      status: value.status,
    });
  }
}
