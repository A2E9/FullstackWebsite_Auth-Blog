import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/Login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginD: Login = {
    username: '',
    password: '',
  };


  errorB!: boolean;
  errorMessage!: string;


  constructor(private authService: AuthService,private router: Router) {} 


  ngOnInit(): void {
  }
  login(username: string, password: string) {
    this.loginD.username = username;
    this.loginD.password = password;
    this.authService.login(this.loginD).subscribe({
      next: (v) => {
        this.router.navigateByUrl('/home');
      }, //50 repetitions
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
