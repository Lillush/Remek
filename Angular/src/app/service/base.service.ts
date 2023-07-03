import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T extends { _id: string | undefined }> {
  apiUrl: string = environment.apiUrl;
  entity: string = '';

  constructor(public http: HttpClient) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}${this.entity}`);
  }

  get(_id: string | number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${this.entity}/${_id}`);
  }

  create(entity: T): Observable<T> {
    const postObject = { ...entity, _id: null };
    return this.http.post<T>(`${this.apiUrl}${this.entity}`, entity);
  }

  update(entity: T): Observable<T> {
    return this.http.put<T>(
      `${this.apiUrl}${this.entity}/${entity._id}`,
      entity
    );
  }

  delete(entity: T): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${this.entity}/${entity._id}`);
  }
}
