import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IGetUser } from '../../interfaces/admin/IGetUser';
import { CommonModule } from '@angular/common';
import { IUserType } from '../../interfaces/admin/IUserType';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { IUserRole } from '../../interfaces/admin/IUserRole';
import { INewUserForm } from '../../interfaces/admin/INewUserForm';
import { ReactiveFormsModule } from '@angular/forms';
import { IBrand } from '../../interfaces/admin/IBrand';
import { IPtoductType } from '../../interfaces/admin/IPtoductType';
import { INewTask } from '../../interfaces/admin/INewTask';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,FormsModule,MatButtonModule, MatDividerModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private _adminS: AdminService,
    private fb: FormBuilder) {}

  users: IGetUser[] = [];
  userStatuses: IUserType[] = [];
  userRoles: IUserRole[] = [];
  formOpen: boolean = false;
  formTaskOpen: boolean = false;
  userFormBody!: INewUserForm;
  userForm!: FormGroup;

  prodTypes: IPtoductType[] = [];
  brands: IBrand[] = [];
  taskFormBody!: INewTask;
  taskForm!: FormGroup;

  ngOnInit(){
    this.getUsers();
    this.initFormUser();
    this.initFormTask();
  }

  toNumber(obj: any): number{
    try {
      return Number(obj);
    } catch (error) {
      return 0;
    }
  }

  changeUserStatus(userId: number, statusId: number, oldstat: number): void{
    if(statusId == oldstat){
      return;
    }
    this._adminS.ChangeUserStatus(userId, statusId)
      .subscribe(r => this.getUsers());
  }

  getUsers(): void{
    this._adminS.getUsers().subscribe(r => {
      this.users = r;
      this._adminS.getStatusTypes().subscribe(r => this.userStatuses = r);
    });
  }

  openForm(): void{
    this.formOpen=!this.formOpen;
    if(!this.formOpen) return;
    this._adminS.getRoles()
      .subscribe(r => this.userRoles = r);
  }

  initFormUser(){
    this.userForm = new FormGroup({
      'UserLogin':  new FormControl('', [Validators.required]),
      'UserPassword': new FormControl('', [Validators.required]),
      'UserFirstName': new FormControl('', [Validators.required]),
      'UserLastName': new FormControl('', [Validators.required]), 
      'UserMiddleName': new FormControl(null),
      'UserEmail': new FormControl('', [Validators.required, Validators.email]),
      'UserRoleId': new FormControl('', [Validators.required])
    })
  }

  regNewUser(): void{
    this.userFormBody = this.userForm.value;
    console.log(this.userFormBody);
    this._adminS.createNewUser(this.userFormBody)
      .subscribe(r =>{
        this.getUsers();
        this.initFormUser();
      })
    
  }

  openTaskForm(): void{
    this.formTaskOpen=!this.formTaskOpen;
    if(!this.formTaskOpen) return;

    this._adminS.getProdTypes()
      .subscribe(r=>this.prodTypes = r);
    
    this._adminS.getBrands()
      .subscribe(r=>this.brands = r);
  }

  initFormTask(): void{
    this.taskForm = new FormGroup({
      'TaskItemBrandId': new FormControl(null, [Validators.required]),
      'TaskProductTypeId': new FormControl(null, [Validators.required]),
      'TaskProductModel': new FormControl(null, [Validators.required]),
      'TaskUserProblemDesc': new FormControl(null, [Validators.required]),
      'TaskCustomerFirstName': new FormControl(null, [Validators.required]),
      'TaskCustomerLastName': new FormControl(null, [Validators.required]),
      'TaskCustomerMiddleName': new FormControl(null),
      'TaskCustomerPhone': new FormControl(null, [Validators.required]),
      'ExecutorId': new FormControl(null, [Validators.required])
    })
  }

  createNewTask(): void{
    this.taskFormBody = this.taskForm.value;
    console.log(this.taskForm.value);
    console.log(this.taskFormBody);
    this._adminS.createNewTask(this.taskFormBody)
      .subscribe(r => {
        this.getUsers();
        this.initFormTask();
      })
  }
}
