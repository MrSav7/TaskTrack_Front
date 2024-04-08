import { Injectable, inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { IGetMyTasks } from '../../interfaces/tasks/IGetMyTask';
import { ITaskInfo } from '../../interfaces/tasks/ITaskInfo';
import { ITaskStep } from '../../interfaces/tasks/ITaskStep';
import { IGetStatuses } from '../../interfaces/tasks/IGetStatuses';

@Injectable({
  providedIn: 'root'
})
export class tasksService {

  constructor(private _httpClient: HttpClient) { }

  public getMyTasks(statuses: string): Observable<IGetMyTasks[]>{
    return this._httpClient.post<IGetMyTasks[]>("GetMyTasks", "'"+ statuses+"'", {headers: {"Content-Type" : "application/json"}});
  }

  public getTaskById(taskId: number): Observable<ITaskInfo>{
    return this._httpClient.get<ITaskInfo>("Task/" + taskId);
  }

  public getTaskSteps(taskId: number): Observable<ITaskStep[]>{
    return this._httpClient.get<ITaskStep[]>("Task/" + taskId + "/GetSteps")
  }

  addStep(text: string, taskId: number){
    return this._httpClient.post("Task/"+taskId+"/AddStep", '"'+text+'"', {headers: {"Content-Type" : "application/json"}});
  }

  getStatuses(): Observable<IGetStatuses[]>{
    return this._httpClient.get<IGetStatuses[]>("GetStatuses");
  }

  changeStatus(taskId: number, statusId: number){
    return this._httpClient.post("Task/"+taskId+"/ChangeStatus", statusId, {headers: {"Content-Type" : "application/json"}});
  }

  chagePlanTime(taskId: number, date: Date){
    return this._httpClient.post("Task/"+taskId+"/ChangePlanTime", '"'+date.toISOString().substring(0, date.toISOString().length - 1)+'"', {headers: {"Content-Type" : "application/json"}})
  }


}
