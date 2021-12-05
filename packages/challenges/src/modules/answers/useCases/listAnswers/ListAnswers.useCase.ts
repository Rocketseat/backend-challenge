import { Injectable } from '@nestjs/common';
import { IAnswer } from '../../interfaces/IAnswer.interface';
import { AnswerRepository } from '../../repositories/prisma/Answer.repository';

@Injectable()
export class ListAnswersUseCase {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute(): Promise<IAnswer[]> {
    const answers = await this.answerRepository.findAll();
    return answers;
  }
}
