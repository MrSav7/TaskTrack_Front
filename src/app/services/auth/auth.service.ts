import { Injectable, inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { IAuth } from '../../interfaces/siteService/IAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _httpClient: HttpClient) { }

  
  login(Auth: IAuth): Observable<any> {
    return this._httpClient.post<any>('User/login', Auth);
  }
}
1