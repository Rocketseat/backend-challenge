import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ChallengeService } from './challenge.service';
import { Challenge } from './entities/challenge.entity';
import { CreateChallengeInput } from './dto/create-challenge.input';
import { UpdateChallengeInput } from './dto/update-challenge.input';
import { ListChallengesArgs } from './dto/list-challenges.args';

@Resolver(() => Challenge)
export class ChallengeResolver {
  constructor(private readonly challengeService: ChallengeService) {}

  @Mutation(() => Challenge)
  createChallenge(
    @Args('createChallengeInput') createChallengeInput: CreateChallengeInput,
  ) {
    return this.challengeService.create(createChallengeInput);
  }

  @Query(() => [Challenge], { name: 'challenges' })
  findAll(@Args() args: ListChallengesArgs) {
    return this.challengeService.findMany(args);
  }

  @Query(() => Challenge, { name: 'challenge' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.challengeService.findOne(id);
  }

  @Mutation(() => Challenge)
  updateChallenge(
    @Args('updateChallengeInput') updateChallengeInput: UpdateChallengeInput,
  ) {
    return this.challengeService.update(updateChallengeInput);
  }

  @Mutation(() => Challenge)
  deleteChallenge(@Args('id', { type: () => String }) id: string) {
    return this.challengeService.delete(id);
  }
}
