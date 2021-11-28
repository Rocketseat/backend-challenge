import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { SendAnswerInput } from '../../dtos/SendAnswer.input';
import { Answer } from '../../entities/Answer.entity';
import { SendAnswerUseCase } from './SendAnswer.useCase';

@Resolver(() => Answer)
export class SendAnswerResolver {
  constructor(private readonly sendAnswerUseCase: SendAnswerUseCase) {}

  @Mutation(() => Answer)
  sendAnswer(@Args('sendAnswerInput') sendAnswerInput: SendAnswerInput) {
    return this.sendAnswerUseCase.execute(sendAnswerInput);
  }
}
