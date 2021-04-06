import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RestorePasswordTokenComponent } from './auth/restore-password-token/restore-password-token.component';
import { RestorePasswordComponent } from './auth/restore-password/restore-password.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { TasksComponent } from './tasks/tasks/tasks.component';


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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
