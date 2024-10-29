// src/app/auth.interceptor.ts
import { Injectable, OnInit } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './services/auth/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // constructor(private loginService: LoginService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');
    console.log(token); // Assume you store your token in localStorage

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
