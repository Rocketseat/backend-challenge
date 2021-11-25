import { Injectable } from '@nestjs/common';
import { CreateChallengeInput } from '../../dto/create-challenge.input';
import { IChallengeRepository } from '../IChallenge.repository';
import { ChallengeInMemoryRepository } from '../inMemory/ChallengeInMemory.repository';

@Injectable()
export class ChallengeRepository extends ChallengeInMemoryRepository {}
