import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-restore-password-token',
  templateUrl: './restore-password-token.component.html',
  styleUrls: ['./restore-password-token.component.css'],
})
export class RestorePasswordTokenComponent implements OnInit {
  restoreForm: FormGroup;
  verificado: boolean;
  reqToken: string;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
    this.verificado = false;
  }

  ngOnInit(): void {
    this.reqToken = this.activatedRoute.snapshot.params.token;

    this.authService.verifyToken(this.reqToken).subscribe(
      (res) => {
        this.verificado = true;
        console.log(res);
      },
      (err) => {
        this.verificado = false;
        let message = err.error.message || err.statusText;
        console.error(message);
        if (message == 'Unknown Error') {
          message = 'Error desconocido';
        }

        this.alertService.danger(`${message}`);

        this.router.navigate(['/login']);
      }
    );
  }

  private buildForm() {
    this.restoreForm = this.formBuilder.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  public onSubmit(thisForm: User) {
    if (thisForm.password != thisForm.repeatPassword) {
      this.alertService.danger(`Las contraseñas deben ser iguales`);
    } else {
      this.authService.resetPassword(this.reqToken,thisForm.password).subscribe(
        (res) => {
          this.alertService.success(`${res.message}`);

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
}
