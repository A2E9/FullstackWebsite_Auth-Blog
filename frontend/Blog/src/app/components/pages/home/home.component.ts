import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/Login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  form!: FormGroup;

  constructor(private localStore: LocalService, private authServ: AuthService) {} //private formBuilder: FormBuilder

  ngOnInit() {
    // this.form = this.formBuilder.group({
    //     username: ['', Validators.maxLength(15)],
    //     password: ['', Validators.maxLength(20)],
    //     email: ['', Validators.email],
    //     first_name: ['' , Validators.maxLength(15)],
    //     last_name: ['', Validators.maxLength(15)]
    // });
    console.log(this.localStore.getData('token'));
    console.log(this.localStore.getObject('user'));
  }
  //
  logout() {
    this.authServ.logout();
  }
}
