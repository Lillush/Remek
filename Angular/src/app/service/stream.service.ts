import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Stream } from '../model/stream';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StreamService extends BaseService<Stream> {
  constructor(public override http: HttpClient) {
    super(http);
    this.entity = 'streams';
  }
}
