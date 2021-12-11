import { Resolver, Query, Args } from '@nestjs/graphql';
import { ListAnswersInput } from '../../dtos/ListAnswers.input';
import { Answer } from '../../entities/Answer.entity';
import { PaginatedAnswers } from '../../typesObjects/PaginatedAnswers.typeObject';
import { ListAnswersUseCase } from './ListAnswers.useCase';

@Resolver(() => Answer)
export class ListAnswersResolver {
  constructor(private readonly listAnswersUseCase: ListAnswersUseCase) {}

  @Query(() => PaginatedAnswers)
  async listAnswers(
    @Args('listAnswersInput', {
      type: () => ListAnswersInput,
    })
    listAnswersInput?: ListAnswersInput,
  ) {
    const { filter, pagination: paginationInput } = listAnswersInput;

    const { answers, pagination } = await this.listAnswersUseCase.execute({
      pagination: paginationInput,
      filter,
    });

    return { answers, pagination };
  }
}
