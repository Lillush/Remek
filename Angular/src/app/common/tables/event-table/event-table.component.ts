import { Component, Input } from '@angular/core';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss'],
})
export class EventTableComponent {
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

  onDelete(event: Event) {
    this.eventService.delete(event).subscribe(() => {
      this.eventService.getAll().subscribe((events) => {
        this.eventList = events;
      });
    });
  }
}
