export interface ListAnswersRepositoryArgs {
  skip: number;
  take: number;
  challengeId?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
}
