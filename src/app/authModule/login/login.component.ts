import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInUser } from './interfaces/user';
import { UserAuthenticationService } from './services/user-authentification.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: String;

  constructor(
    private fb: FormBuilder,
    private authService: UserAuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(12)
        ]
      ]
    });
  }

  submit({ value }: { value: LogInUser }) {
    this.authService
      .signIn(value)
      .then(r => {
        this.router.navigate(['/apps']);
      })
      .catch(err => {
        this.error = err.message;
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
