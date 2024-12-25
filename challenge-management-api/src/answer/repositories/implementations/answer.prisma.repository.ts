import { PrismaService } from "src/prisma/prisma.service";
import { AnswerRepository } from "../answer.repository";
import { CreateAnswerRepositoryInput } from "src/answer/dto/create-answer.repo.input";
import { Answer } from "src/answer/entities/answer.entity";
import { ListAnswersArgs } from "src/answer/dto/list-answers.args";
import { parseFilters } from "src/utils/parse-filters";
import { UpdateAnswerRepositoryInput } from "src/answer/dto/update-answer.repo.input";

export class AnswerPrismaRepository implements AnswerRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(input: CreateAnswerRepositoryInput): Promise<Answer> {
        return this.prisma.answer.create({
            data: input
        });
    }

    async findOne(id: string): Promise<Answer> {
        return this.prisma.answer.findUnique({
            where: { id }
        });
    }

    async findMany(args: ListAnswersArgs) {
        const { page, limit, challengeId, status, startDate, endDate } = args;

        const queryArgs = {
            skip: page,
            take: limit,
            where: parseFilters([
                {
                    field: 'challengeId',
                    operator: 'equals',
                    value: challengeId,
                },
                {
                    field: 'status',
                    operator: 'equals',
                    value: status,
                },
                {
                    field: 'createdAt',
                    operator: 'gte',
                    value: startDate,
                },
                {
                    field: 'createdAt',
                    operator: 'lte',
                    value: endDate,
                },
            ]),
        };
    
        return this.prisma.answer.findMany(queryArgs);
    }

    async update(input: UpdateAnswerRepositoryInput) {
        const {id, ...data} = input;
        return this.prisma.answer.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        this.prisma.answer.delete({
            where: { id },
        });
    }
}