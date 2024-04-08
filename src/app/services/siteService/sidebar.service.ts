import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISidebar } from '../../interfaces/siteService/ISidebar';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  constructor(private _httpClient: HttpClient) { }

  public getMenuItems(): Observable<ISidebar[]>{
    return this._httpClient.get<ISidebar[]>("Identity/getMenuItems");
  }
}
