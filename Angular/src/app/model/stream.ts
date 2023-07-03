import { User } from './user';

export class Stream {
  _id!: string;
  title: string = '';
  game: string = '';
  startDate: Date = new Date();
  streamLink: string = '';
}
