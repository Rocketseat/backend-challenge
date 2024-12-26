import { Answer } from 'src/answer/entities/answer.entity';
import { AnswerRepository } from '../answer.repository';
import { CreateAnswerRepositoryInput } from 'src/answer/dto/create-answer.repo.input';
import { UpdateAnswerRepositoryInput } from 'src/answer/dto/update-answer.repo.input';
import { ListAnswersRepositoryArgs } from 'src/answer/dto/List-answers.repo.args';

export class AnswerFakeRepository implements AnswerRepository {
  public answers: Answer[] = [];

  async create(input: CreateAnswerRepositoryInput): Promise<Answer> {
    const answerData = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      ...input,
    };
    this.answers.push(answerData);
    return answerData;
  }

  async findOne(id: string): Promise<Answer> {
    const answer = this.answers.find((answer) => answer.id === id);
    return answer;
  }

  async findMany(args: ListAnswersRepositoryArgs): Promise<Answer[]> {
    const { skip, take, ...filters } = args;
    let result = this.answers;

    // Apenas para fins de testes, limitando os filtros
    // a util `parseFilters` não seria tão útil aqui pela sua especificidade
    // para o Prisma
    const filterOps = {
      startDate: (answer, value) => answer.createdAt >= value,
      endDate: (answer, value) => answer.createdAt <= value,
      challengeId: (answer, value) => answer.challengeId === value,
      status: (answer, value) => answer.status === value,
    };

    for (const filter in filters) {
      result = result.filter((answer) =>
        filterOps[filter](answer, filters[filter]),
      );
    }
    return result.slice(skip, skip + take);
  }

  async update(input: UpdateAnswerRepositoryInput): Promise<Answer> {
    const { id, ...data } = input;
    const answer = this.answers.find((answer) => answer.id === id);
    this.answers = this.answers.filter((answer) => answer.id !== id);
    const updatedAnswer = {
      id,
      updatedAt: new Date(),
      ...data,
      ...answer,
    };
    this.answers.push(updatedAnswer);
    return updatedAnswer;
  }

  async delete(id: string): Promise<void> {
    this.answers = this.answers.filter((answer) => answer.id !== id);
  }
}
