import { Component } from '@angular/core';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import localeHu from '@angular/common/locales/hu';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeHu, 'hu');

@Component({
  selector: 'app-mini-calendar',
  templateUrl: './mini-calendar.component.html',
  styleUrls: ['./mini-calendar.component.scss'],
})
export class MiniCalendarComponent {
  title = 'calendar';

  weekdays: string[] = ['H', 'K', 'Sz', 'Cs', 'P', 'Szo', 'V'];
  daysInMonth: Array<{
    game: string;
    day: number;
    title: string;
    eventPage: string;
  }> = [];
  today: Date = new Date();

  eventList: Event[] = [];

  selectedEvent: boolean = false;
  selectedTitle: string = '';
  selectedPage: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getAll().subscribe((events) => {
      this.eventList = events;
      this.initializeCalendar(this.today.getMonth());
    });
  }

  skipMonth(direction: string) {
    this.daysInMonth = [];
    switch (direction) {
      case '+':
        this.today = new Date(
          this.today.getFullYear(),
          this.today.getMonth() + 1
        );
        this.initializeCalendar(this.today.getMonth());
        break;

      case '-':
        this.today = new Date(
          this.today.getFullYear(),
          this.today.getMonth() - 1
        );
        this.initializeCalendar(this.today.getMonth());
        break;
    }
  }

  initializeCalendar(month: number) {
    let daysOfEvents: Array<{
      game: string;
      day: number;
      title: string;
      eventPage: string;
    }> = [];

    for (let i = 1; i <= new Date(2023, month + 1, 0).getDate(); i++) {
      this.daysInMonth.push({
        game: '',
        day: i,
        title: '',
        eventPage: '',
      });
    }

    for (let i = 0; i < new Date(2023, month, 1).getDay() - 1; i++) {
      this.daysInMonth.unshift({
        game: '',
        day: 0,
        title: '',
        eventPage: '',
      });
    }

    const eventsOfTheMonth = this.eventList.filter(
      (event) => month + 1 === Number(String(event.startDate).split('-')[1])
    );

    eventsOfTheMonth.forEach((event) => {
      this.daysInMonth.forEach((dayObj) => {
        if (
          parseInt(String(event.startDate).split('-')[2].slice(0, 2)) ===
          dayObj.day
        ) {
          dayObj.game = event.game;
          dayObj.title = event.title;
          dayObj.eventPage = event.eventPage;
        }
      });
    });
  }
  onDayClick(day: any) {
    if (day.game !== '') {
      this.selectedEvent = true;
      this.selectedTitle = day.title;
      this.selectedPage = day.eventPage;
    } else {
      this.selectedEvent = false;
    }
  }
}
