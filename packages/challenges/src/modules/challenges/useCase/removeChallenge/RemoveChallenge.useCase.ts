import { Injectable } from '@nestjs/common';
import { ChallengeRepository } from '../../repositories/prisma/Challenge.repository';

@Injectable()
export class RemoveChallengeUseCase {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async execute(challengeId: string): Promise<boolean> {
    const wasRemoved = await this.challengeRepository.removeById(challengeId);

    if (!wasRemoved) {
      throw new Error('Challenge not found');
    }

    return wasRemoved;
  }
}
