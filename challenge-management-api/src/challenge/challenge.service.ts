import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChallengeInput } from './dto/create-challenge.input';
import { UpdateChallengeInput } from './dto/update-challenge.input';
import { ListChallengesArgs } from './dto/list-challenges.args';
import { ChallengeRepository } from './repositories/challenge.repository';

@Injectable()
export class ChallengeService {
  constructor(
    @Inject('ChallengeRepository')
    private readonly challengeRepository: ChallengeRepository
  ) {}
  async create(createChallengeInput: CreateChallengeInput) {
    const existingChallenge = await this.challengeRepository.findByTitle(createChallengeInput.title);
    if (existingChallenge) {
      throw new BadRequestException(`challenge with title ${createChallengeInput.title} already exists!`);
    }
    return this.challengeRepository.create(createChallengeInput);
  }

  async findAll(args: ListChallengesArgs) {
    let { page, limit, title, description } = args;
    const defaultPageSize = 15;
    limit = limit ?? defaultPageSize;
    page = page ? (page - 1) * limit : 0;
    const queryArgs = {
      page,
      limit,
      title,
      description,
    };
    return this.challengeRepository.findMany(queryArgs);
  }

  async findOne(id: string) {
    return this.challengeRepository.findOne(id);
  }

  async update(updateChallengeInput: UpdateChallengeInput) {
    const existingChallenge = await this.challengeRepository.findByTitle(updateChallengeInput.title);
    if (existingChallenge) {
      throw new BadRequestException(`challenge with title ${updateChallengeInput.title} already exists!`);
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
