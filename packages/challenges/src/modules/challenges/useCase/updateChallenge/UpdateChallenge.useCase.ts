import { Injectable } from '@nestjs/common';
import { UpdateChallengeInput } from '../../dto/update-challenge.input';
import { IChallenge } from '../../interfaces/IChallenge.interface';
import { ChallengeRepository } from '../../repositories/prisma/Challenge.repository';

@Injectable()
export class UpdateChallengeUseCase {
  constructor(private challengeRepository: ChallengeRepository) {}

  async execute(
    challengeId: string,
    challenge: UpdateChallengeInput,
  ): Promise<IChallenge> {
    const challengeUpdated = await this.challengeRepository.updateById(
      challengeId,
      challenge,
    );

    if (!challengeUpdated) {
      throw new Error('Challenge not found');
    }

    return challengeUpdated;
  }
}
