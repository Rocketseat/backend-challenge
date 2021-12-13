import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Status } from '../../enums/Status.enum';
import { UpdateAnswerUseCase } from './UpdateAnswer.useCase';

interface IUpdateAnswerInput {
  submissionId: string;
  grade: number;
  status: Status;
}

interface IKafkaMessage {
  value: IUpdateAnswerInput;
}

@Controller()
export class UpdateAnswerController {
  constructor(private readonly updateAnswerUseCase: UpdateAnswerUseCase) {}

  @MessagePattern('challenge.correction.reply')
  async execute(@Payload() { value }: IKafkaMessage) {
    await this.updateAnswerUseCase.execute(value);
  }
}
