import { Resolver, Query, Args } from '@nestjs/graphql';
import { ListChallengesInput } from '../../dto/list-challenges.input';
import { Challenge } from '../../entities/challenge.entity';
import { PaginatedChallenges } from '../../typesObjects/paginated-challenges.typeObject';
import { ListChallengesUseCase } from './ListChallenges.useCase';

@Resolver(() => Challenge)
export class ListChallengesResolver {
  constructor(private readonly listChallengesUseCase: ListChallengesUseCase) {}

  @Query(() => PaginatedChallenges)
  async listChallenges(
    @Args('listChallengesInput', {
      type: () => ListChallengesInput,
    })
    listChallengesInput?: ListChallengesInput,
  ) {
    const { search, pagination: paginationInput } = listChallengesInput;

    const { challenges, pagination } = await this.listChallengesUseCase.execute(
      {
        pagination: paginationInput,
        search,
      },
    );

    return { challenges, pagination };
  }
}
