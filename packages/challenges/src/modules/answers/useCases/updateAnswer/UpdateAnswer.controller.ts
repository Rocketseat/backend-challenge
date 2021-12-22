import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IController } from 'src/core/infra/Controller.interface';
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
export class UpdateAnswerController
  implements IController<IKafkaMessage, void>
{
  constructor(private readonly updateAnswerUseCase: UpdateAnswerUseCase) {}

  @MessagePattern('challenge.correction.reply')
  async handle(@Payload() { value }: IKafkaMessage) {
    await this.updateAnswerUseCase.execute(value);
  }
}
