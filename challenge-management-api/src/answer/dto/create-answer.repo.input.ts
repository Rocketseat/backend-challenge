import { AnswerStatus } from "@prisma/client";

export interface CreateAnswerRepositoryInput {
    status: AnswerStatus;
    repositoryUrl: string;
    challengeId?: string;
    errorMessage?: string;
}