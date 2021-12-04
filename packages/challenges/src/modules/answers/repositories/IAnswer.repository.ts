import { Status } from '../enums/Status.enum';
import { IAnswer } from '../interfaces/IAnswer.interface';

export interface ICreateAnswerInput {
  challengeId: string;
  link: string;
  status: Status;
  grade: number;
}

export interface IAnswerRepository {
  create(creatAnswerInput: ICreateAnswerInput): Promise<IAnswer>;
  updateById(answerId: string, answer: Partial<IAnswer>): Promise<IAnswer>;
  findById(answerId: string): Promise<IAnswer>;
}