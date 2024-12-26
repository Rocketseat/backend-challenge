import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChallengeInput } from './dto/create-challenge.input';
import { UpdateChallengeInput } from './dto/update-challenge.input';
import { ListChallengesArgs } from './dto/list-challenges.args';
import { ChallengeRepository } from './repositories/challenge.repository';

@Injectable()
export class ChallengeService {
  constructor(
    @Inject('ChallengeRepository')
    private readonly challengeRepository: ChallengeRepository,
  ) {}
  async create(createChallengeInput: CreateChallengeInput) {
    const existingChallenge = await this.challengeRepository.findByTitle(
      createChallengeInput.title,
    );
    if (existingChallenge) {
      throw new BadRequestException(
        `challenge with title ${createChallengeInput.title} already exists!`,
      );
    }
    return this.challengeRepository.create(createChallengeInput);
  }

  async findMany(args: ListChallengesArgs) {
    const defaultPageSize = 15;
    const { page, limit, ...data } = args;
    const take = limit ?? defaultPageSize;
    const skip = page ? (page - 1) * take : 0;
    const queryArgs = {
      take,
      skip,
      ...data,
    };

    return this.challengeRepository.findMany(queryArgs);
  }

  async findOne(id: string) {
    return this.challengeRepository.findOne(id);
  }

  async update(updateChallengeInput: UpdateChallengeInput) {
    const challengeExists = await this.challengeRepository.findOne(
      updateChallengeInput.id,
    );
    if (!challengeExists) {
      throw new NotFoundException();
    }

    const existingChallengeWithTitle =
      await this.challengeRepository.findByTitle(updateChallengeInput.title);
    if (existingChallengeWithTitle) {
      throw new BadRequestException(
        `challenge with title ${updateChallengeInput.title} already exists!`,
      );
    }
    return this.challengeRepository.update(updateChallengeInput);
  }

  async delete(id: string) {
    const challengeExists = await this.challengeRepository.findOne(id);
    if (!challengeExists) {
      throw new NotFoundException();
    }
    return this.challengeRepository.delete(id);
  }
}
