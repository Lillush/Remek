import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root',
})
export class EventService extends BaseService<Event> {
  constructor(public override http: HttpClient) {
    super(http);
    this.entity = 'events';
  }
}
