import { Component } from '@angular/core';
import { SidebarService } from '../../services/siteService/sidebar.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ISidebar } from '../../interfaces/siteService/ISidebar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [HttpClientModule, CommonModule,RouterModule],
  providers: [SidebarService,HttpClient],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor (private sidebar: SidebarService) {}

  public menuItems: ISidebar[] = []
  public ngOnInit(): void{
    this.sidebar.getMenuItems().subscribe(res => this.menuItems = res);
  }
}
