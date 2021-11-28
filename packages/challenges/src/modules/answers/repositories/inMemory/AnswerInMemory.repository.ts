import { IAnswer } from '../../interfaces/IAnswer.interface';
import { IAnswerRepository, ICreateAnswerInput } from '../IAnswer.repository';

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
}
