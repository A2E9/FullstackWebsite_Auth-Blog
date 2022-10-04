import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  private url = 'http://localhost:8000/';

  xToken: any = this.localStore.getData('token'); 

  constructor(
    private http: HttpClient,
    private localStore: LocalService,
    private router: Router
  ) {}

  getPosts(): any {
    let headers = new HttpHeaders({
      Authorization: `Token ${this.xToken}`,
    });
    return this.http.get<any>(this.url + 'api/posts/', {
      headers: headers,
    });
  }

  createPost(post: any): any {
    let headers = new HttpHeaders({
      Authorization: `Token ${this.xToken}`,
    });
    console.log(post);
    return this.http.post<any>(this.url + 'api/blogpost/', post, {
      headers: headers,
    });
  }

}