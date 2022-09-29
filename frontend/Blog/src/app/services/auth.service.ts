import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../Login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  login(credentials: Login): Observable<any> {
    console.log(credentials);
    return this.http.post<any>(this.apiUrl + 'api/login/', credentials);
  }
}
