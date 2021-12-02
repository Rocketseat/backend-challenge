import { Injectable, Scope } from '@nestjs/common';
import { AnswerInMemoryRepository } from '../inMemory/AnswerInMemory.repository';

@Injectable({ scope: Scope.DEFAULT })
export class AnswerRepository extends AnswerInMemoryRepository {}
