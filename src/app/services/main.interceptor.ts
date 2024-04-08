import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environments } from '../environments/environments';
import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class mainInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let Token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Authorization': 'Bearer '+Token
    });
    let modifiedRequest = req.clone({
      url: environments.apiURL + req.url,
      headers: req.headers.append('Authorization', 'Bearer '+Token)});
    return next.handle(modifiedRequest);
  }
}