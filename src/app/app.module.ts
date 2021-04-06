import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from '@full-fledged/alerts';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './header/header.component';
import { RestorePasswordComponent } from './auth/restore-password/restore-password.component';
import { RestorePasswordTokenComponent } from './auth/restore-password-token/restore-password-token.component';
import { AuthService } from './services/auth.service';
import { TasksService } from './services/tasks.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { TasksComponent } from './tasks/tasks/tasks.component';
import { ViewTaskComponent } from './tasks/view-task/view-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    RestorePasswordComponent,
    RestorePasswordTokenComponent,
    TasksComponent,
    AddTaskComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AlertModule.forRoot({ maxMessages: 3, timeout: 5000 }),
  ],
  providers: [
    AuthService,
    TasksService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
