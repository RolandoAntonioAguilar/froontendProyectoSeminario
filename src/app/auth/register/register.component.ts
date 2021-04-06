import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

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
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  public onSubmit(thisForm: User) {
    console.log(thisForm);
    
    if (thisForm.password != thisForm.repeatPassword) {
      this.alertService.danger(`Las contraseñas deben ser iguales`);
    } else {
      const user: User = {
        email: thisForm.email,
        password: thisForm.password,
      };
      this.authService.register(user).subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          this.alertService.success('Bienvenido ' + thisForm.email);
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
}
