import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { SearchService } from 'src/app/service/search.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  userList: User[] = [];

  phrase: string = '';

  constructor(
    private userService: UserService,
    private ar: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((users) => {
      this.userList = users;
    });
    this.searchService.searchPhrase.subscribe((phrase) => {
      this.phrase = phrase;
    });
  }

  onDelete(user: User) {
    this.userService.delete(user).subscribe(() => {
      this.userService.getAll().subscribe((users) => {
        this.userList = users;
      });
    });
  }
}
