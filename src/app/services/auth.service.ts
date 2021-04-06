import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint: string;

  constructor(private http: HttpClient, private router: Router) {
    this.endpoint = 'http://' + window.location.hostname + ':3000/api';
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/user/login`, user);
  }
  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/user/register`, user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  sendEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/user/send_mail`, email);
  }
  
  resetPassword(password: string): Observable<any> {
    return this.http.post<any>(
      `${this.endpoint}/user/reset_password/${this.getToken()}`,
      password
    );
  }
}
