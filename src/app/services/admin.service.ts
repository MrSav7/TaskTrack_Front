import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetUser } from '../interfaces/admin/IGetUser';
import { IUserType } from '../interfaces/admin/IUserType';
import { IUserRole } from '../interfaces/admin/IUserRole';
import { INewUserForm } from '../interfaces/admin/INewUserForm';
import { IPtoductType } from '../interfaces/admin/IPtoductType';
import { IBrand } from '../interfaces/admin/IBrand';
import { INewTask } from '../interfaces/admin/INewTask';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _httpClient: HttpClient) { }

  getUsers(): Observable<IGetUser[]>{
    return this._httpClient.get<IGetUser[]>("User/AmdGetUsers");
  }

  getStatusTypes(): Observable<IUserType[]>{
    return this._httpClient.get<IUserType[]>("User/StatusTypes");
  }

  ChangeUserStatus(userId: number, status: number){
    let body ={
      "statusId": status,
      "userId": userId
    }
    return this._httpClient.post("User/ChangeUserStatus",body);
  }

  getRoles(): Observable<IUserRole[]>{
    return this._httpClient.get<IUserRole[]>("User/GetRoles");
  }

  createNewUser(user:INewUserForm){
    return this._httpClient.post("User/CreateNewUser",user);
  }

  getProdTypes(): Observable<IPtoductType[]>{
    return this._httpClient.get<IPtoductType[]>("GetAllProductTypes");
  }

  getBrands(): Observable<IBrand[]>{
    return this._httpClient.get<IBrand[]>("GetAllBrands");
  }

  createNewTask(task: INewTask){
    return this._httpClient.post("CreateNewTask",task);
  }
}
