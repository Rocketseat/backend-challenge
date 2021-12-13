import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/core/domain/Pagination.interface';
import { PaginationInput } from 'src/modules/challenges/dto/pagination.input';
import {
  IFilter,
  IListAllResponse,
} from '../../repositories/IAnswer.repository';
import { AnswerRepository } from '../../repositories/prisma/Answer.repository';

interface IListAnswersInput {
  pagination?: Partial<Pagination>;
  filter?: IFilter;
}
@Injectable()
export class ListAnswersUseCase {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute(
    listAnswersInput: IListAnswersInput,
  ): Promise<IListAllResponse> {
    const DEFAULT_PAGINATION = {
      page: 1,
      pageSize: 10,
    } as PaginationInput;

    const answers = await this.answerRepository.findAll(
      {
        ...DEFAULT_PAGINATION,
        ...listAnswersInput?.pagination,
      },
      listAnswersInput?.filter,
    );

    return answers;
  }
}
