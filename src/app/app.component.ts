import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { TasksComponent } from './modules/tasks/tasks.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    SidebarComponent,
    TasksComponent,
    RouterModule],
    providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected title: string = 'TaskTrack_Front';
  protected p: string = "aaa";
  showmessage(){
    this.p="bbb";
  }
}
