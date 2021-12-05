import { Injectable } from '@nestjs/common';
import { IAnswer } from '../../interfaces/IAnswer.interface';
import { IAnswerRepository, ICreateAnswerInput } from '../IAnswer.repository';

@Injectable()
export class AnswerInMemoryRepository implements IAnswerRepository {
  private _answers: IAnswer[] = [];

  async create(creatAnswerInput: ICreateAnswerInput): Promise<IAnswer> {
    const answer = {
      ...creatAnswerInput,
      id: `${Number(this._answers.length) + 1}`,
      createdAt: new Date(),
    };

    this._answers.push(answer);

    return answer;
  }

  async updateById(answerId: string, answer: Partial<IAnswer>) {
    const answerIndex = this._answers.findIndex(
      (answerItem) => answerItem.id === answerId,
    );

    if (answerIndex === -1) {
      return null;
    }

    this._answers[answerIndex] = {
      ...this._answers[answerIndex],
      ...answer,
    };

    return this._answers[answerIndex];
  }

  async findById(answerId: string): Promise<IAnswer> {
    const answer = this._answers.find(
      (answerItem) => answerItem.id === answerId,
    );

    return answer;
  }

  async findAll(): Promise<IAnswer[]> {
    return this._answers;
  }
}
