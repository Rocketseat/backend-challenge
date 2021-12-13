import { Injectable } from '@nestjs/common';
import { Status } from '../../enums/Status.enum';
import { AnswerRepository } from '../../repositories/prisma/Answer.repository';

interface IUpdateAnswerInput {
  submissionId: string;
  grade: number;
  status: Status;
}

@Injectable()
export class UpdateAnswerUseCase {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute(updateAnswerInput: IUpdateAnswerInput) {
    await this.answerRepository.updateById(updateAnswerInput.submissionId, {
      grade: updateAnswerInput.grade,
      status: updateAnswerInput.status,
    });
  }
}
