import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  showUserTable: boolean = true;
  showEventTable: boolean = false;
  showArticleTable: boolean = false;

  newElementType: string = '';

  @Output() addNewItem: EventEmitter<string> = new EventEmitter();

  constructor(private ar: ActivatedRoute, private router: Router) {}
  onUsersButtonClick() {
    this.showUserTable = true;
    this.showEventTable = false;
    this.showArticleTable = false;
  }

  onEventsButtonClick() {
    this.showUserTable = false;
    this.showEventTable = true;
    this.showArticleTable = false;
  }

  onArticlesButtonClick() {
    this.showUserTable = false;
    this.showEventTable = false;
    this.showArticleTable = true;
  }

  onNewClick() {
    if (this.showUserTable) {
      this.newElementType = 'user';
      this.router.navigate(['/userEditor/0']);
    } else if (this.showEventTable) {
      this.newElementType = 'event';
      this.router.navigate(['/eventEditor/0']);
    } else {
      this.newElementType = 'article';
      this.router.navigate(['/articleEditor/0']);
    }
  }
}
