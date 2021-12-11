import { AppModule } from './app.module';

describe('Challenges Module', () => {
  let appModule: AppModule;
  beforeEach(async () => {
    appModule = new AppModule();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });
});
