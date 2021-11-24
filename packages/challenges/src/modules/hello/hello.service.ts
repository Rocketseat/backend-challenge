import { Injectable } from '@nestjs/common';
import { Hello } from './hello.model';

@Injectable()
export class HelloService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async show(): Promise<Hello> {
    return {
      message: 'Hello World!',
    };
  }
}
