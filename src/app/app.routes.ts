import { Routes } from '@angular/router';
import { TasksComponent } from './modules/tasks/tasks.component';
import { LoginComponent } from './modules/login/login.component';
import { StatisticComponent } from './modules/statistic/statistic.component';
import { OpentaskComponent } from './modules/opentask/opentask.component';
import { AdminComponent } from './modules/admin/admin.component';

export const routes: Routes = [
{
    path: 'login',
    component: LoginComponent
},
{
    path: 'tasks',
    component: TasksComponent
},
{
    path: 'statistic',
    component: StatisticComponent
},
{
    path: 'tasks/opentask/:id',
    component: OpentaskComponent
},
{
    path: 'admin',
    component: AdminComponent
}];
