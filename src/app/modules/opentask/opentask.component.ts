import { Component, inject } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { tasksService } from '../../services/tasks/tasks.service';
import { ITaskInfo } from '../../interfaces/tasks/ITaskInfo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ITaskStep } from '../../interfaces/tasks/ITaskStep';
import { IGetStatuses } from '../../interfaces/tasks/IGetStatuses';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DateAdapter, MAT_DATE_FORMATS, provideNativeDateAdapter} from '@angular/material/core';
import { CustomDateAdapter, MY_DATE_FORMATS } from '../../environments/mydateformat';

@Component({
  selector: 'app-opentask',
  standalone: true,
  imports: [FormsModule,CommonModule,MatFormFieldModule, MatInputModule, MatDatepickerModule],
  providers:[{ provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },],
  templateUrl: './opentask.component.html',
  styleUrl: './opentask.component.css'
})
export class OpentaskComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  taskId = 0;
  taskSteps: ITaskStep[] = [];
  addStepText = '';
  addStepError = '';
  statuses: IGetStatuses[] = [];
  selectedStatus: number = 1;
  chagePlanTimeB:boolean = false;
  datepicker!: Date;


  constructor(private taskS: tasksService) {
    this.taskId = Number(this.route.snapshot.params['id']);
  }

  public taskInfo!: ITaskInfo;

  public ngOnInit(): void{
    this.taskS.getTaskById(this.taskId)
    .subscribe(res => {
      this.taskInfo = res;
      this.taskS.getTaskSteps(this.taskId)
        .subscribe(res =>this.taskSteps = res);

      this.taskS.getStatuses()
        .subscribe(res => this.statuses = res)
      
    });
    //console.log(this.taskInfo);
  }

  addStep(): void{
    this.taskS.addStep(this.addStepText, this.taskId)
    .subscribe(res => {
      this.taskS.getTaskSteps(this.taskId)
      .subscribe(res => this.taskSteps = res);
    })
    
  }

  isInvalid(): boolean{
    if((this.addStepText.replace(/\s/g, '')).length > 3 && this.addStepText.length < 400){
      this.addStepError = "";
      return false;
    }else{
      this.addStepError = "Кол-во символов должно быть в диапозоне от 3 до 400!";
      return true;
    }
  }

  changeStatus(): void{
    console.log(this.selectedStatus);
    this.taskS.changeStatus(this.taskId, this.selectedStatus)
    .subscribe(res => {
      window.location.reload();
    })
  }

  openChagePlanTime(): void{
    this.chagePlanTimeB = !this.chagePlanTimeB;
    console.log(this.datepicker);
  }

  chagePlanTime(): void{
    if(!this.datepicker){
      return;
    }
    console.log("aaa");
    this.taskS.chagePlanTime(this.taskId, this.datepicker)
      .subscribe(res => window.location.reload());
  }
}
