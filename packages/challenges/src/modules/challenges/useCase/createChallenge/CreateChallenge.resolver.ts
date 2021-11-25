import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Challenge } from '../../entities/challenge.entity';
import { CreateChallengeInput } from '../../dto/create-challenge.input';
import { CreateChallengeUseCase } from './CreateChallenge.useCase';

@Resolver(() => Challenge)
export class CreateChallengeUseCaseResolver {
  constructor(
    private readonly createChallengeUseCase: CreateChallengeUseCase,
  ) {}

  @Mutation(() => Challenge)
  createChallenge(
    @Args('createChallengeInput') createChallengeInput: CreateChallengeInput,
  ) {
    return this.createChallengeUseCase.execute(createChallengeInput);
  }
}
