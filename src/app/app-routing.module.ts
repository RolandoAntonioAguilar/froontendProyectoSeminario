import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RestorePasswordTokenComponent } from './auth/restore-password-token/restore-password-token.component';
import { RestorePasswordComponent } from './auth/restore-password/restore-password.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { TasksComponent } from './tasks/tasks/tasks.component';
import { ViewTaskComponent } from './tasks/view-task/view-task.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'restore_password',
    component: RestorePasswordComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'restore_password/:token',
    component: RestorePasswordTokenComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'task/add',
    component: AddTaskComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'task/view/:_id',
    component: ViewTaskComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
