import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

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
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public onSubmit(thisForm: User) {
    const user: User = {
      email: thisForm.email,
      password: thisForm.password,
    };
    this.authService.login(user).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.alertService.success(`Bienvenido ${thisForm.email}`);
        
        this.router.navigate(['/tasks']);
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
