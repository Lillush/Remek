import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedinUser } from 'src/app/model/loggedin-user';
import { Stream } from 'src/app/model/stream';
import { AuthService } from 'src/app/service/auth.service';
import { StreamService } from 'src/app/service/stream.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  allStreams: Stream[] = [];
  loggedInUser!: LoggedinUser | null;

  thisDay: string = new Date()
    .toLocaleDateString()
    .replace('. ', '-')
    .replace('. ', '-');

  today: Date = new Date();

  daysInMonth: Array<{
    day: number;
    stream: Stream[];
  }> = [];

  weekDays = [
    'Hétfő',
    'Kedd',
    'Szerda',
    'Csütörtök',
    'Péntek',
    'Szombat',
    'Vasárnap',
  ];

  selectedDayStreams: Stream[] = [];

  constructor(
    private streamService: StreamService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.streamService.getAll().subscribe({
      next: (streams) => {
        streams.forEach((stream) => {
          const formatedDate = String(stream.startDate).slice(0, 10);
          if (formatedDate >= this.thisDay.toString()) {
            this.allStreams.push(stream);
          }
        });
        this.initializeCalendar(this.today.getMonth());
      },
    });
    this.authService.currentUserSubject.subscribe({
      next: (user) => {
        this.loggedInUser = user;
      },
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
    for (let i = 1; i <= new Date(2023, month + 1, 0).getDate(); i++) {
      this.daysInMonth.push({
        day: i,
        stream: [],
      });
    }

    for (let i = 0; i < new Date(2023, month, 1).getDay() - 1; i++) {
      this.daysInMonth.unshift({
        day: 0,
        stream: [],
      });
    }

    const streamsOfTheMonth = this.allStreams.filter(
      (stream) => month + 1 === Number(String(stream.startDate).split('-')[1])
    );

    streamsOfTheMonth.forEach((stream) => {
      this.daysInMonth.forEach((dayObj, i) => {
        if (
          parseInt(String(stream.startDate).split('-')[2].slice(0, 2)) ===
          dayObj.day
        ) {
          dayObj.stream.push(stream);
        }
      });
    });
  }

  onDayClick(day: any) {
    this.selectedDayStreams = day.stream;
  }
}
