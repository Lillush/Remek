import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-streamers',
  templateUrl: './streamers.component.html',
  styleUrls: ['./streamers.component.scss'],
})
export class StreamersComponent {
  streamerList: User[] = [];
  role: string = 'streamer';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService
      .getAll()
      .subscribe(
        (users) =>
          (this.streamerList = users.filter((user) => user.role === this.role))
      );
  }
}
