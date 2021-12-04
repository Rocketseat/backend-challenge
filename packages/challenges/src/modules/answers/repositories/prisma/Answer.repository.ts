import { Injectable, Scope } from '@nestjs/common';
import { AnswerInMemoryRepository } from '../inMemory/AnswerInMemory.repository';

@Injectable()
export class AnswerRepository extends AnswerInMemoryRepository {}
