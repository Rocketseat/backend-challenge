import { CreateChallengeInput } from "src/challenge/dto/create-challenge.input";
import { ListChallengesArgs } from "src/challenge/dto/list-challenges.args";
import { UpdateChallengeInput } from "src/challenge/dto/update-challenge.input";
import { Challenge } from "src/challenge/entities/challenge.entity";
import { PrismaService } from "src/prisma/prisma.service";
import { parseFilters } from "src/utils/parse-filters";
import { ChallengeRepository } from "../challenge.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ChallengePrismaRepository implements ChallengeRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(input: CreateChallengeInput): Promise<Challenge> {
        return this.prisma.challenge.create({ data: input });
    }

    async findOne(id: string): Promise<Challenge> {
        return this.prisma.challenge.findUnique({ where: { id }});
    }

    async findMany(args: ListChallengesArgs): Promise<Challenge[]> {
        const { page, limit, title, description } = args;
        const queryArgs = {
            skip: page,
            take: limit,
            where: parseFilters([
                {
                    field: 'title',
                    operator: 'contains',
                    value: title,
                },
                {
                    field: 'description',
                    operator: 'contains',
                    value: description,
                },
            ]),
        };
    
        return this.prisma.challenge.findMany(queryArgs);
    }

    async update(input: UpdateChallengeInput): Promise<Challenge> {
        const { id, ...data } = input;
        return this.prisma.challenge.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<void> {
        this.prisma.challenge.delete({ where: { id }});
    }
}