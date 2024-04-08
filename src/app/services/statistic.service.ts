import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITaskStatus } from '../interfaces/statistic/ITaskStatus';
import { ITaskStatusUser } from '../interfaces/statistic/ITaskStatusUser';
import { ITaskStatBrand } from '../interfaces/statistic/ITaskStatBrand';
import { ITaskStatProdType } from '../interfaces/statistic/ITaskStatProdType';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private _httpClient: HttpClient) { }

  getTaskStastus(): Observable<ITaskStatus[]>{
    return this._httpClient.get<ITaskStatus[]>("Statistic/TaskStastus");
  }

  TaskStatusUsers(): Observable<ITaskStatusUser[]>{
    return this._httpClient.get<ITaskStatusUser[]>("Statistic/TaskStatusUsers");
  }

  TaskStastusFiltered(dateStart: Date, dateEnd: Date): Observable<ITaskStatus>{
    let body = {
      dateStart: dateStart,
      dateEnd: dateEnd
    };
    return this._httpClient.post<ITaskStatus>("Statistic/TaskStastusFiltered", body, {headers: {"Content-Type" : "application/json"}});
  }

  TaskStatProdTypes(): Observable<ITaskStatProdType[]>{
    return this._httpClient.get<ITaskStatProdType[]>("Statistic/TaskStatProdType");
  }

  TaskStatBrands(): Observable<ITaskStatBrand[]>{
    return this._httpClient.get<ITaskStatBrand[]>("Statistic/TaskStatBrand");
  }
}
