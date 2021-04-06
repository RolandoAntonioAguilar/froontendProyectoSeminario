import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private endpoint: string;

  constructor(private http: HttpClient, private router: Router) {
    this.endpoint = 'http://' + window.location.hostname + ':3000/api';
  }

  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/task/tasks`);
  }
  getTask(_id: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/task/task/${_id}`);
  }
  addTask(task: Task): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/task/create`, task);
  }
  updateTask(_id: string, task: Task): Observable<any> {
    return this.http.put<any>(`${this.endpoint}/task/update/${_id}`, task);
  }
  updateStateTask(_id: string): Observable<any> {
    return this.http.patch<any>(`${this.endpoint}/task/state/${_id}`, {});
  }
  deleteTask(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/task/delete/${_id}`);
  }
}
