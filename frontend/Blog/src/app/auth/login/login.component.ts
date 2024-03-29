import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  value1!: string;

  errorB!: boolean;
  errorMessage!: string;
  userForm: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStore: LocalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ]),
    });
  }
  onSubmit() {
    console.log('Login');
    this.authService.login(this.userForm.value).subscribe({
      next: (v) => {
        // this.localStore.setItem('token', v.token);
        this.localStore.setItem('user', v);
          },
      error: (e) => {
        this.errorMessage = this.authService.handleError(e);
        this.errorB = true;
      },
      complete: () => {},
    });
  }
}
