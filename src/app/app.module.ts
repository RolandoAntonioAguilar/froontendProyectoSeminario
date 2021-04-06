import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from '@full-fledged/alerts';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './header/header.component';
import { RestorePasswordComponent } from './auth/restore-password/restore-password.component';
import { RestorePasswordTokenComponent } from './auth/restore-password-token/restore-password-token.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    RestorePasswordComponent,
    RestorePasswordTokenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
