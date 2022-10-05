import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/Login';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginD: Login = {
    username: '',
    password: '',
  };

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
        this.localStore.saveData('token', v.token);
        this.localStore.saveObject('user', v);
        this.localStore.saveObject('user_id', v.user_info.id); 
        // this.localStore.saveObject('username', v.user_info.username); 
        console.log(this.localStore.getData('user_id'));
          },
      error: (e) => {
        if (e.status == 400) {
          this.errorMessage = 'Invalid credentials';
        } else if (e.status == 500) {
          this.errorMessage = 'Server error';
        } else if (e.status == 404) {
          this.errorMessage = 'Not found';
        }
        this.errorB = true;
      },
      complete: () => {},
    });
  }
}
