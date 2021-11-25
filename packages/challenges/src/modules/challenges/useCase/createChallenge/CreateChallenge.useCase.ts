import { Injectable } from '@nestjs/common';
import { CreateChallengeInput } from '../../dto/create-challenge.input';
import { ChallengeRepository } from '../../repositories/prisma/Challenge.repository';

@Injectable()
export class CreateChallengeUseCase {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async execute(createChallengeInput: CreateChallengeInput) {
    const challenge = this.challengeRepository.create(createChallengeInput);

    return challenge;
  }
}
