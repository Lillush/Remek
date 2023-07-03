import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const request = req.clone({
        headers: req.headers.set('authorization', `Bearer ${token}`),
      });
      return next.handle(request);
    }
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 403 || err.status === 401) {
          return this.handle403Error(req, next);
        } else {
          return throwError(() => new Error('Oups, something happend...'));
        }
      })
    );
  }

  handle403Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.authService.refresh().pipe(
      switchMap((tokenData) => {
        const newRequest = req.clone({
          headers: req.headers.set(
            'Authorization',
            `Bearer ${tokenData.accessToken}`
          ),
        });
        return next.handle(newRequest);
      })
    );
  }
}
