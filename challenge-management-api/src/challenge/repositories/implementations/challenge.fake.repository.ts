import { Challenge } from "src/challenge/entities/challenge.entity";
import { ChallengeRepository } from "../challenge.repository";
import { CreateChallengeInput } from "src/challenge/dto/create-challenge.input";
import { ListChallengesArgs } from "src/challenge/dto/list-challenges.args";
import { UpdateChallengeInput } from "src/challenge/dto/update-challenge.input";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ChallengeFakeRepository implements ChallengeRepository {
    public challenges: Challenge[] = [];

    async create(input: CreateChallengeInput): Promise<Challenge> {
        const challengeData = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date,
            ...input,
        }
        this.challenges.push(challengeData);
        return challengeData;
    }

    async findOne(id: string): Promise<Challenge> {
        return this.challenges.find((challenge) => challenge.id === id);
    }

    async findMany(args: ListChallengesArgs): Promise<Challenge[]> {
        return this.challenges;
    }

    async update(input: UpdateChallengeInput): Promise<Challenge> {
        const { id, ...data } = input;
        const challenge = this.challenges.find((challenge) => challenge.id === id);
        this.challenges = this.challenges.filter((challenge) => challenge.id !== id);
        const updatedChallenge = {
            updatedAt: new Date(),
            ...data,
            ...challenge,
        };
        this.challenges.push(updatedChallenge);
        return updatedChallenge;
    }

    async delete(id: string): Promise<void> {
        this.challenges = this.challenges.filter((challenge) => challenge.id !== id);
    }
}