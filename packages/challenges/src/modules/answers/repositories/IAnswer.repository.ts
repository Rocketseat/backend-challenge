import { PaginationInput } from 'src/modules/challenges/dto/pagination.input';
import { IPagination } from 'src/modules/challenges/interfaces/IPagination.interface';
import { Status } from '../enums/Status.enum';
import { IAnswer } from '../interfaces/IAnswer.interface';

export interface ICreateAnswerInput {
  challengeId: string;
  link: string;
  status: Status;
  grade: number;
  createdAt?: Date;
}

export interface IFilter {
  challengeId?: string;
  status?: Status;
  dateBetween?: {
    start: Date;
    end: Date;
  };
}

export interface IListAllResponse {
  answers: IAnswer[];
  pagination: IPagination;
}

export interface IAnswerRepository {
  create(creatAnswerInput: ICreateAnswerInput): Promise<IAnswer>;
  updateById(answerId: string, answer: Partial<IAnswer>): Promise<IAnswer>;
  findById(answerId: string): Promise<IAnswer>;
  findAll(
    pagination?: PaginationInput,
    filter?: IFilter,
  ): Promise<IListAllResponse>;
}
