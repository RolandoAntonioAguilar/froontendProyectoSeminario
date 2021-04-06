import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private taskService: TasksService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  private buildForm() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  public onSubmit(thisForm: Task) {
    const newTask: Task = {
      title: thisForm.title,
      description: thisForm.description,
    };
    this.taskService.addTask(newTask).subscribe(
      (res) => {
        this.alertService.success(`${res.message}`);

        this.router.navigate(['tasks']);
      },
      (err) => {
        let message = err.error.message || err.statusText;
        console.error(message);
        if (message == 'Unknown Error') {
          message = 'Error desconocido';
        }

        this.alertService.danger(`${message}`);
      }
    );
  }
}
