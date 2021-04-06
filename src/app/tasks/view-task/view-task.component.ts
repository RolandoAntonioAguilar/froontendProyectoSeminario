import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
})
export class ViewTaskComponent implements OnInit {
  taskForm: FormGroup;
  task: Task;
  taskId: string;
  state: string;
  edit: boolean;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private taskService: TasksService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.taskId = this.activatedRoute.snapshot.params._id;
    this.state = 'Pendiente';
    this.edit = false;
    this.buildForm();
  }

  ngOnInit() {
    this.getTask();
  }

  private buildForm() {
    this.taskForm = this.formBuilder.group({
      title: [{ value: '', disable: true }, Validators.required],
      description: [{ value: '', disable: true }, Validators.required],
    });
  }
  public getTask() {
    this.taskService.getTask(this.taskId).subscribe(
      (res) => {
        if (res.state === true) {
          this.state = 'Finalizado';
        }
        this.task = res;
        this.taskForm.patchValue({
          title: res.title,
          description: res.description,
        });
      },
      (err) => {
        {
          let message = err.error.message || err.statusText;
          console.error(message);
          if (message == 'Unknown Error') {
            message = 'Error desconocido';
          }

          this.alertService.danger(`${message}`);
          this.router.navigate(['tasks']);
        }
      }
    );
  }
  public activateEdit() {
    this.edit = true;
  }

  public onSubmit(thisForm: Task) {
    const newTask: Task = {
      title: thisForm.title,
      description: thisForm.description,
    };

    this.taskService.updateTask(this.task._id, newTask).subscribe(
      (res) => {
        this.alertService.success(`${res.message}`);
        this.edit = false;
        this.getTask();
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
  public deleteTask() {
    this.taskService.deleteTask(this.task._id).subscribe(
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
