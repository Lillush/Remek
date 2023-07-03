export class Event {
  _id!: string;
  title: string = '';
  description: string = '';
  game: string = '';
  type: string = '';
  startDate: Date = new Date();
  eventPage: string = '';
}
