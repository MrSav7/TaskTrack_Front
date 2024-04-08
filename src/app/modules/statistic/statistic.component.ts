import { Component } from '@angular/core';
import { StatisticService } from '../../services/statistic.service';
import { ITaskStatus } from '../../interfaces/statistic/ITaskStatus';
import { ITaskStatusUser } from '../../interfaces/statistic/ITaskStatusUser';
import {DateAdapter, MAT_DATE_FORMATS, provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CustomDateAdapter, MY_DATE_FORMATS } from '../../environments/mydateformat';
import { ITaskStatBrand } from '../../interfaces/statistic/ITaskStatBrand';
import { ITaskStatProdType } from '../../interfaces/statistic/ITaskStatProdType';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule,FormsModule],
  providers:[{ provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css'
})
export class StatisticComponent {
  constructor(private statS: StatisticService) {}

  TaskStastus: ITaskStatus[] =[];
  TaskStatUser: ITaskStatusUser[] = [];
  TaskStatBr: ITaskStatBrand[] = [];
  TaskStatPrT: ITaskStatProdType[] = [];
  TaskStatF!: ITaskStatus;
  showFilter: boolean = false;
  dateStart!: Date;
  dateEnd!: Date;

  ngOnInit(){
    this.statS.getTaskStastus()
      .subscribe(r => this.TaskStastus = r);
    this.statS.TaskStatusUsers()
      .subscribe(r => this.TaskStatUser = r);
    this.statS.TaskStatBrands()
      .subscribe(r => this.TaskStatBr = r);
    this.statS.TaskStatProdTypes()
      .subscribe(r => this.TaskStatPrT = r);
  }

  showFilteredStat(): void{
    this.showFilter=!this.showFilter;
    this.statS.TaskStastusFiltered(this.dateStart, this.dateEnd)
      .subscribe(r => {
        this.TaskStatF = r;
      });
      this.dateStart = this.dateStart!;
      this.dateEnd = this.dateEnd!;
  } 
}
