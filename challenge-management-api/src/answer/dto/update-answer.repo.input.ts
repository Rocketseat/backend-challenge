import { AnswerStatus } from "@prisma/client";

export interface UpdateAnswerRepositoryInput {
    id: string;
    status?: AnswerStatus;
    score?: number;
    errorMessage?: string;
}