import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { ListAnswersArgs } from './dto/list-answers.args';
import { ChallengeService } from '../challenge/challenge.service';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(
    private readonly answerService: AnswerService,
    private readonly challengeService: ChallengeService,
  ) {}

  @Mutation(() => Answer)
  createAnswer(
    @Args('createAnswerInput') createAnswerInput: CreateAnswerInput,
  ) {
    return this.answerService.create(createAnswerInput);
  }

  @Query(() => [Answer], { name: 'answers' })
  findAll(@Args() args: ListAnswersArgs) {
    return this.answerService.findAll(args);
  }

  @ResolveField('challenge')
  challenge(@Parent() answer: Answer) {
    return this.challengeService.findOne(answer.challengeId);
  }
}
