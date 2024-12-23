import { Injectable } from '@nestjs/common';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidGitUrl } from 'src/utils/is-valid-git-url';
import { AnswerStatus } from '@prisma/client';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAnswerInput: CreateAnswerInput) {
    const { challengeId, repositoryUrl } = createAnswerInput;
    let status: AnswerStatus = AnswerStatus.PENDING;

    if (!isValidGitUrl(repositoryUrl)) {
      status = AnswerStatus.ERROR;
    }

    const challenge = await this.prisma.challenge.findFirstOrThrow({
      where: { id: challengeId },
    });

    return this.prisma.answer.create({
      data: {
        status,
        repositoryUrl,
        challengeId: challenge.id,
      },
    });
  }

  findAll() {
    return `This action returns all answer`;
  }

  findOne(id: string) {
    return `This action returns a #${id} answer`;
  }

  update(updateAnswerInput: UpdateAnswerInput) {
    const { id, ...data } = updateAnswerInput;
    return `This action updates a #${id} answer`;
  }

  remove(id: string) {
    return `This action removes a #${id} answer`;
  }
}
