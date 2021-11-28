import { Status } from '../enums/Status.enum';

export interface IAnswer {
  id: string;
  challengeId: string;
  link: string;
  status: Status;
  grade: number;
  createdAt: Date;
}
