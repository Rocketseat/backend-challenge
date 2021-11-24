import { Module } from '@nestjs/common';
import { HelloResolver } from './hello.resolver';
import { HelloService } from './hello.service';

@Module({
  providers: [HelloResolver, HelloService],
})
export class HelloModule {}
