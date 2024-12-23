-- CreateEnum
CREATE TYPE "AnswerStatus" AS ENUM ('PENDING', 'ERROR', 'DONE');

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "challenge_id" TEXT NOT NULL,
    "repository_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "AnswerStatus" NOT NULL,
    "score" DOUBLE PRECISION,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
