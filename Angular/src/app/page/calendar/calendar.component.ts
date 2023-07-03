import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  eventList: Event[] = [];
  phrase: string = '';

  constructor(
    private eventService: EventService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.eventService.getAll().subscribe((events) => {
      this.eventList = events;
    });
    this.searchService.searchPhrase.subscribe((phrase) => {
      this.phrase = phrase;
    });
  }
}
