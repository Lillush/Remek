import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss'],
})
export class UserEditorComponent implements OnInit {
  user: User = new User();

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.ar.params.subscribe((params) => {
      if (params['id'] !== '0') {
        this.userService.get(params['id']).subscribe((user: User) => {
          this.user = user;
        });
      }
    });
  }

  onUpdate(user: User) {
    if (!user._id) {
      this.userService
        .create(user)
        .subscribe(() => this.router.navigate(['/admin']));
    } else {
      this.userService
        .update(user)
        .subscribe(() => this.router.navigate(['/admin']));
    }
  }
}
