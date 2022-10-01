import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Login } from '../Login';
import { catchError, retry, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8000/';

  private token:any; //User Interface TODO

  constructor(private http: HttpClient) {}

  login(credentials: Login): Observable<any> {
    let urlLogin = this.url + 'api/login/';
    // this.getAuthStatus();
    //console.log(credentials);
    return this.http.post<any>(urlLogin, credentials)
    .pipe(
      tap((data) => {console.log('server data:', data.token); this.token = data.token}),
      // catchError(this.handleError('login', urlLogin))
    );
  }




  getAuthStatus() {
    //this.http.request('POST' ,this.url + 'api/login/').subscribe(response => console.log(response));
    // return localStorage.getItem('token') !== null;
    return this.token !== null;
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
      return (errMsg);
    };
  }

}
