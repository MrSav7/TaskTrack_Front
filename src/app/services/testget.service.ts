import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TestgetService {

  constructor(private _httpClient: HttpClient) { }

  public getTest(): Observable<any>{
    return this._httpClient.get<any>('https://jsonplaceholder.typicode.com/posts');
  }
}
