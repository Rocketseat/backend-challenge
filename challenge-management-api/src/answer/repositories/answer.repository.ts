import { CreateAnswerRepositoryInput } from "../dto/create-answer.repo.input";
import { ListAnswersArgs } from "../dto/list-answers.args";
import { UpdateAnswerRepositoryInput } from "../dto/update-answer.repo.input";
import { Answer } from "../entities/answer.entity";

export interface AnswerRepository {
    create(input: CreateAnswerRepositoryInput): Promise<Answer>;
    findOne(id: string): Promise<Answer>;
    findMany(args: ListAnswersArgs): Promise<Answer[]>;
    update(input: UpdateAnswerRepositoryInput): Promise<Answer>;
    delete(id: string): Promise<void>;
}