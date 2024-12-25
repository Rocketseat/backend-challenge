import { Answer } from "src/answer/entities/answer.entity";
import { AnswerRepository } from "../answer.repository";
import { CreateAnswerRepositoryInput } from "src/answer/dto/create-answer.repo.input";
import { ListAnswersArgs } from "src/answer/dto/list-answers.args";
import { UpdateAnswerRepositoryInput } from "src/answer/dto/update-answer.repo.input";

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

    async findMany(args: ListAnswersArgs): Promise<Answer[]> {
        return this.answers;
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
        }
        this.answers.push(updatedAnswer);
        return updatedAnswer;
    }

    async delete(id: string): Promise<void> {
        this.answers = this.answers.filter((answer) => answer.id !== id);
    }
}