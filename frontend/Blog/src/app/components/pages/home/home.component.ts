import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/Login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loginD: Login = {
    username: '',
    password: '',
    
  };
  form!: FormGroup;


  constructor(private authService: AuthService, ) {}//private formBuilder: FormBuilder

  ngOnInit() {
    // this.form = this.formBuilder.group({   
    //     username: ['', Validators.maxLength(15)],
    //     password: ['', Validators.maxLength(20)],
    //     email: ['', Validators.email],    
    //     first_name: ['' , Validators.maxLength(15)],
    //     last_name: ['', Validators.maxLength(15)]
    // });
}
 

  
  login(username:string, password:string) {
    this.loginD.username = username;
    this.loginD.password = password;
    this.authService.login(this.loginD).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.log(e),
      complete: () => console.info('complete') 
  });
  }

  
}
