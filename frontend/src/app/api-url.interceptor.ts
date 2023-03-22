import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './auth/user.service';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.userService.token
    request = request.clone({
      url: `http://localhost:3000${request.url}`,
      headers: token ? request.headers.set('Authorization', `Bearer ${token}`) : request.headers
    });
    return next.handle(request);
  }
}
