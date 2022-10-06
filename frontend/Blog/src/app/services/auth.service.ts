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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8000/';

  xToken: any = this.localStore.getData('token'); 

  constructor(
    private http: HttpClient,
    private localStore: LocalService,
    private router: Router
  ) {}

  getAuthStatus() {
    return this.localStore.getData('token') !== null;
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
    let headers = new HttpHeaders({
      Authorization: `Token ${this.xToken}`,
    });
    this.localStore.removeData('token');
    this.localStore.removeData('user');
    this.router.navigate(['login/']);
    return this.http.post<any>(this.url + 'api/logout/', null, {
      headers: headers,
    });
  }

  private handleError(operation: String, url: String) {
    return (err: any) => {
      let errMsg = `error in ${operation}() retrieving ${url}`;
      console.log(`${errMsg}:`, err);
      if (err instanceof HttpErrorResponse) {
        // you could extract more info about the error if you want, e.g.:
        console.log(`status: ${err.status}, ${err.statusText}`);
        // errMsg = ...
      }
      return errMsg;
    };
  }
}
