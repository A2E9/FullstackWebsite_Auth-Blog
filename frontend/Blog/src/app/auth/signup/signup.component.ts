import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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


  constructor(
    private formBuilder: FormBuilder,
    private authServ: AuthService,
    private localStore: LocalService,
    private router: Router
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
      confirm_password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', ), //[Validators.required], Validators.email
      first_name: new FormControl('', [
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
    this.authServ.register(this.userForm.value).subscribe({
      next: (v) => {
        this.localStore.saveData('token', v.token);
        this.localStore.saveObject('user', v);
        this.router.navigateByUrl('home');
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
