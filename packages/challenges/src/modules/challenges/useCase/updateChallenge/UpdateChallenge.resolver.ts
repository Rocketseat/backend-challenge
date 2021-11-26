import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Challenge } from '../../entities/challenge.entity';
import { UpdateChallengeInput } from '../../dto/update-challenge.input';
import { UpdateChallengeUseCase } from './UpdateChallenge.useCase';

@Resolver(() => Challenge)
export class UpdateChallengeResolver {
  constructor(
    private readonly updateChallengeUseCase: UpdateChallengeUseCase,
  ) {}

  @Mutation(() => Challenge)
  updateChallenge(
    @Args('challengeId') challengeId: string,
    @Args('updateChallengeInput') updateChallengeInput: UpdateChallengeInput,
  ) {
    return this.updateChallengeUseCase.execute(
      challengeId,
      updateChallengeInput,
    );
  }
}
