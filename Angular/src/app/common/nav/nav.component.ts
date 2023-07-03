import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedinUser } from 'src/app/model/loggedin-user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  loggedInUser!: LoggedinUser | null;
  constructor(
    private authService: AuthService,
    private ar: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe({
      next: (user) => {
        this.loggedInUser = user;
      },
    });
  }

  onLogoutClick() {
    this.authService.logout().subscribe();
    this.router.navigate(['']);
    this.loggedInUser = null;
  }
}
