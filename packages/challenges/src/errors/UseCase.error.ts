export class UseCaseError extends Error {
  errosMessages: string[];
  body: any;

  constructor(errosMessages: string[], body?: any) {
    super();
    this.name = 'UseCaseError';
    this.errosMessages = errosMessages;
    this.body = body;
  }
}
