import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  errorB!: boolean;
  errorMessage!: string;
  userForm: any;
  value2: string = "Password";
  value1!: string;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStore: LocalService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ]),
      password: 
      new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        // Validators.maxLength(20),
        // Validators.pattern('^[a-zA-Z0-9]+$'),
      ])
      ,

      confirm_password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', ), //[Validators.required], Validators.email
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      last_name: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
    });
  }
  onSubmit() {
    console.log('Register');
    this.authService.register(this.userForm.value).subscribe({
      next: (v) => {
        // this.localStore.setItem('token', v.token);
        this.localStore.setItem('user', v);
        this.router.navigateByUrl('home');
      },
      error: (e) => {
        this.errorMessage = this.authService.handleError(e);
        this.errorB = true;
      },
      complete: () => {},
    });
  }
}
