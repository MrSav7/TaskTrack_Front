import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environments } from '../environments/environments';
import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class authInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        if (error.status == 401 || error.status == 0) {
          // Перенаправление на страницу авторизации
          this.router.navigate(['login']);
          //console.log("aaaaaa 401!");
        }
        return throwError(error);
      })
    );
  }
}