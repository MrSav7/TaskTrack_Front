import { Component } from '@angular/core';
import { tasksService } from '../../services/tasks/tasks.service';
import { IGetMyTasks } from '../../interfaces/tasks/IGetMyTask';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarService } from '../../services/siteService/sidebar.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterModule],
  providers: [SidebarService,HttpClient],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  constructor (private taskS: tasksService) {}

  public tasksArr: IGetMyTasks[] = [];

  statuses = '"1,2,3,4"';
  public ngOnInit(): void{
    this.taskS.getMyTasks(this.statuses).subscribe(res => this.tasksArr = res);
    console.log(this.tasksArr);
  }
}
