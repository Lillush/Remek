export class Article {
  _id!: string;
  title: string = '';
  category: string = '';
  short: string = '';
  article1: string = '';
  article2?: string = '';
  article3?: string = '';
  postImg: string = '';
  mainImg: string = '';
  lead: boolean = false;
  postDate: Date = new Date();
}
