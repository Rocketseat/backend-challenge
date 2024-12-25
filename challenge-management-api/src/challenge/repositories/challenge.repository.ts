import { CreateChallengeInput } from "../dto/create-challenge.input";
import { ListChallengesArgs } from "../dto/list-challenges.args";
import { UpdateChallengeInput } from "../dto/update-challenge.input";
import { Challenge } from "../entities/challenge.entity";

export interface ChallengeRepository {
    create(input: CreateChallengeInput): Promise<Challenge>;
    findOne(id: string): Promise<Challenge>;
    findMany(args: ListChallengesArgs): Promise<Challenge[]>;
    update(input: UpdateChallengeInput): Promise<Challenge>;
    delete(id: string): Promise<void>;
}