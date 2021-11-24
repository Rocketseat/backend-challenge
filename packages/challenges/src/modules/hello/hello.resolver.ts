import { Query, Resolver } from '@nestjs/graphql';
import { Hello } from './hello.model';
import { HelloService } from './hello.service';

@Resolver(() => Hello)
export class HelloResolver {
  constructor(private readonly helloService: HelloService) {}

  @Query(() => Hello)
  async hello(): Promise<Hello> {
    return this.helloService.show();
  }
}
