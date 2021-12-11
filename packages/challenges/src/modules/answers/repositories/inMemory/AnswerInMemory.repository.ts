import { Injectable } from '@nestjs/common';
import { PaginationInput } from 'src/modules/challenges/dto/pagination.input';
import { IAnswer } from '../../interfaces/IAnswer.interface';
import {
  IAnswerRepository,
  ICreateAnswerInput,
  IFilter,
  IListAllResponse,
} from '../IAnswer.repository';

@Injectable()
export class AnswerInMemoryRepository implements IAnswerRepository {
  private _answers: IAnswer[] = [];

  async create(creatAnswerInput: ICreateAnswerInput): Promise<IAnswer> {
    const answer = {
      ...creatAnswerInput,
      id: `${Number(this._answers.length) + 1}`,
      createdAt: creatAnswerInput?.createdAt || new Date(),
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

  async findAll(
    pagination?: PaginationInput,
    filter?: IFilter,
  ): Promise<IListAllResponse> {
    const { page, pageSize } = pagination;

    const answersFiltered = this._answers.filter((answer) => {
      if (filter?.challengeId && answer.challengeId !== filter.challengeId) {
        return false;
      }

      if (filter?.status && answer.status !== filter.status) {
        return false;
      }

      if (filter?.dateBetween) {
        const { start, end } = filter.dateBetween;

        if (
          answer.createdAt.getTime() < new Date(start).getTime() ||
          answer.createdAt.getTime() > new Date(end).getTime()
        ) {
          return false;
        }
      }

      return true;
    });

    const totalItems = answersFiltered.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const containsNextPage = page < totalPages;

    const answers = answersFiltered.slice(
      pageSize * (page - 1),
      pageSize * page,
    );

    return {
      answers,
      pagination: {
        page,
        pageSize,
        totalPages,
        totalItems,
        containsNextPage,
      },
    };
  }
}
