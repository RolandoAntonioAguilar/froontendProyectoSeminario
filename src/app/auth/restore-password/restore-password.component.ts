import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css'],
})
export class RestorePasswordComponent implements OnInit {
  restoreForm: FormGroup;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.restoreForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public onSubmit(thisForm: User) {
    
    this.authService.sendEmail(thisForm.email).subscribe(
      (res) => {
        this.alertService.success(
          `Correo electrónico enviado a ${thisForm.email}`
        );

        this.router.navigate(['/login']);
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
