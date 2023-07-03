import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss'],
})
export class EventEditorComponent implements OnInit {
  event: Event = new Event();
  isUpdating: boolean = false;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.ar.params.subscribe((params) => {
      if (params['id'] !== '0') {
        this.eventService.get(params['id']).subscribe((event: Event) => {
          this.event = event;
          this.isUpdating = true;
        });
      } else {
        this.isUpdating = false;
      }
    });
  }

  onUpdate(event: Event) {
    if (this.isUpdating) {
      this.eventService
        .update(event)
        .subscribe(() => this.router.navigate(['/admin']));
    } else {
      this.eventService
        .create(event)
        .subscribe(() => this.router.navigate(['/admin']));
    }
  }
}
