import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, retry, tap } from 'rxjs/operators';
import { LocalService } from './local.service';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8000/';
  private localStorage: Storage | undefined;
  xToken: any 

  constructor(
    private http: HttpClient,
    private localStore: LocalService,
    private router: Router
  ) {
    this.localStorage = window.localStorage
    this.xToken = this.localStore.getItem('user',true)?.token
  }

  getAuthStatus() {
    return this.xToken
  }

  login(credentials: any): Observable<any> {
    let urlLogin = this.url + 'api/login/';
    return this.http.post<any>(urlLogin, credentials)
    .pipe(
      tap((data) => {
        this.router.navigateByUrl('home');
        console.log('server data:', data);
      })
      // catchError(this.handleError('login', urlLogin))
    );
  }
  register(credentials: any): Observable<any> {
    let urlRegister = this.url + 'api/register/';
    this.router.navigateByUrl('home');
    return this.http.post<any>(urlRegister, credentials).pipe(
      tap((data) => {
        console.log('server data:', data);
      })
    );
  }

  logout() {
    console.log('2')
    let headers = new HttpHeaders({
      Authorization: `Token ${this.xToken}`,
    });
    // this.localStore.removeItem('token');
    this.localStore.removeItem('user');
    this.router.navigate(['login/']);
    return this.http.post<any>(this.url + 'api/logout/', null, {
      headers: headers,
    });
  }

  handleError(e:any) {
    if (e.status >= 400 && e.status < 500) {
      if (e.status === 400) {
        return 'Invalid credentials';
      } else if (e.status === 401) {
        return 'Unauthorized';
      } else if (e.status === 403) {
        return 'Forbidden';
      } else if (e.status === 404) {
        return 'Not found';
      } else {
        return 'Client error';
      }
    } else if (e.status >= 500 && e.status < 600) {
      if (e.status === 500) {
        return 'Server error';
      } else {
        return 'Server error';
      }
    } else {
      return 'An unknown error occurred';
    }
  }
}
