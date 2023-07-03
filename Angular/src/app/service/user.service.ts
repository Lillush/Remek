import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  constructor(public override http: HttpClient) {
    super(http);
    this.entity = 'users';
  }

  query(queryString: string): Observable<User | User[]> {
    const url = `${environment.apiUrl}${this.entity}?${queryString}`;
    return this.http.get<User | User[]>(url);
  }
}
