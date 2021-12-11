import { AnswersModule } from './answers.module';

describe('Answers Module', () => {
  let answersModule: AnswersModule;
  beforeEach(async () => {
    answersModule = new AnswersModule();
  });

  it('should be defined', () => {
    expect(answersModule).toBeDefined();
  });
});
