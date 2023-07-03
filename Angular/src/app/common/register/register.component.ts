import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isStreamer: boolean = false;
  newUser: User = new User();

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ifStreamerSelected(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    if (!this.isStreamer) {
      this.isStreamer = true;
    } else {
      this.isStreamer = false;
    }
  }

  onRegisterUser(newUser: User) {
    if (!this.isStreamer) {
      this.newUser.isStreamer = this.isStreamer;
      this.newUser.role = 'user';
    } else {
      this.newUser.isStreamer = this.isStreamer;
      this.newUser.role = 'streamer';
    }
    this.userService
      .create(newUser)
      .subscribe((newUser) => this.router.navigate(['/login']));
  }
}
