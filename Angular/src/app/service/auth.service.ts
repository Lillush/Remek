import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { LoggedinUser } from '../model/loggedin-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl: string = `${environment.apiUrl}login`;
  currentUserSubject: BehaviorSubject<LoggedinUser | null> =
    new BehaviorSubject<LoggedinUser | null>(null);
  lastToken: string = '';
  storageName = 'currentUser';

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  login(userLog: any): Observable<{
    accessToken: string;
    refreshToken: string;
    user: LoggedinUser;
  }> {
    return this.http
      .post<{ accessToken: string; refreshToken: string; user: LoggedinUser }>(
        `${this.loginUrl}`,
        userLog
      )
      .pipe(
        tap((loginData) => {
          if (loginData.accessToken && loginData.refreshToken) {
            localStorage.setItem('accessToken', loginData.accessToken);
            localStorage.setItem('refreshToken', loginData.refreshToken);
          }
          this.currentUserSubject.next(loginData.user);
        })
      );
  }

  refresh(): Observable<{ accessToken: string }> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http
      .post<{ accessToken: string }>(`${environment.apiUrl}refresh`, {
        refreshToken,
      })
      .pipe(
        tap((tokenData) => {
          if (tokenData && tokenData.accessToken) {
            localStorage.removeItem('accessToken');
            localStorage.setItem('accessToken', tokenData.accessToken);
          }
        })
      );
  }

  logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    this.currentUserSubject.next(null);
    return this.http.post(`${environment.apiUrl}logout`, {
      refreshToken,
    });
  }

  me(): Observable<{ user: LoggedinUser }> {
    return this.http
      .get<{ user: LoggedinUser }>(`${environment.apiUrl}me`)
      .pipe(
        tap((user) => {
          this.currentUserSubject.next(user.user);
        })
      );
  }

  get userObject(): BehaviorSubject<LoggedinUser | null> {
    return this.currentUserSubject;
  }
}
