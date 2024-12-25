/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `challenges` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "challenges_title_key" ON "challenges"("title");
