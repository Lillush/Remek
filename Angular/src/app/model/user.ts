import { Stream } from './stream';

export class User {
  _id!: string;
  firstName: string = '';
  lastName: string = '';
  nickName: string = '';
  email: string = '';
  password: string = '';
  isStreamer: boolean = false;
  role: string = '';
  mainGame?: string = '';
  streamSite?: string = '';
  profilePic?: string = '';
  streams?: Array<Stream> = [];
}
