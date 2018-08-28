import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInUser } from '../login/interfaces/user';
import { UserAuthenticationService } from '../login/services/user-authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: String;

  constructor(
    private fb: FormBuilder,
    private authService: UserAuthenticationService,
    private router: Router
  ) {}
  ngOnInit() {
    this.registerForm = this.fb.group({
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(12)]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ]
    });
  }
  submit({ value }: { value: LogInUser }) {
    this.authService
      .register(value)
      .then(r => {
        this.router.navigate(['/apps']);
      })
      .catch(err => {
        this.error = err.message;
      });
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
