import { ChallengesModule } from './challenges.module';

describe('Challenges Module', () => {
  let challengesModule: ChallengesModule;
  beforeEach(async () => {
    challengesModule = new ChallengesModule();
  });

  it('should be defined', () => {
    expect(challengesModule).toBeDefined();
  });
});
