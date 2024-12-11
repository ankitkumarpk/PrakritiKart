import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from './services/auth/login.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');
    
    // console.log('Token:', token);

    const cloned = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      : req;

    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Interceptor error:', error);
        
        switch (error.status) {
          case 401:
            this.toastr.error('Unauthorized. Please log in again.');
            localStorage.removeItem('authToken');
            break;
          case 400:
            this.toastr.error('Bad Request');
            break;
          case 403:
            this.toastr.error('Forbidden');
            break;
          case 404:
            this.toastr.error('Data Not Found');
            break;
          case 500:
            this.toastr.error('Internal Server Error');
            break;
          case 408:
            this.toastr.error('Request Timeout');
            break;
          default:
            this.toastr.error('Server load Failed. Please try again later.');
        }

        return throwError(() => error);
      })
    );
  }
}
