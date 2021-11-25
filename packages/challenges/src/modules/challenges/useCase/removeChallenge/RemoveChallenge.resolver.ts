import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Challenge } from '../../entities/challenge.entity';
import { RemoveChallengeUseCase } from './RemoveChallenge.useCase';

@Resolver(() => Challenge)
export class RemoveChallengeResolver {
  constructor(
    private readonly removeChallengeUseCase: RemoveChallengeUseCase,
  ) {}

  @Mutation(() => Boolean)
  removeChallenge(@Args('challengeId') challengeId: string) {
    return this.removeChallengeUseCase.execute(challengeId);
  }
}
