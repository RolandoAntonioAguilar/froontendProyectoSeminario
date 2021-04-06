import { Component, OnInit } from '@angular/core';
import { AlertService } from '@full-fledged/alerts';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  constructor(private alertService: AlertService) {}

  ngOnInit() {}
}
