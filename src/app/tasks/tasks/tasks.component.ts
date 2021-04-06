import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  constructor(
    private alertService: AlertService,
    private tasksService: TasksService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.tasksService.getTasks().subscribe(
      (res) => {
        this.tasks = res;
      },
      (err) => {
        {
          let message = err.error.message || err.statusText;
          console.error(message);
          if (message == 'Unknown Error') {
            message = 'Error desconocido';
          }

          this.alertService.danger(`${message}`);
        }
      }
    );
  }

  updateStateTask(_id: string) {
    this.tasksService.updateStateTask(_id).subscribe(
      (res) => {
        this.alertService.success(`${res.message}`);
        this.getTasks();
      },
      (err) => {
        {
          let message = err.error.message || err.statusText;
          console.error(message);
          if (message == 'Unknown Error') {
            message = 'Error desconocido';
          }

          this.alertService.danger(`${message}`);
        }
      }
    );
  }
}
