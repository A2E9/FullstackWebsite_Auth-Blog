import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { async, tap, window } from 'rxjs';
import { Post } from '../Post';
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
    return this.http.get<Post[]>(this.url + 'api/blogpostlist/', {
      headers: headers,
    }).pipe(
      tap( 
      {
        
        error: async (error) =>  {if(error.status === 401) this.localStore.clearData(); location.reload();}
      }
      )
    );};
    // .pipe((data: any) => {
  //     console.log(data);
  //     return data;
  // })

  // getPostsAll(): any {
  //   let headers = new HttpHeaders({
  //     Authorization: `Token ${this.xToken}`,
  //   });
  //   return this.http.get<any>(this.url + 'api/blogpostlist/',{headers: headers})
  //   .toPromise()
  //   .then((data:any) => <Post[]>data)
  //   .then((data2:any) =>{   console.log(data2); return data2});

  // }
  createPost(post: any): any {
    let headers = new HttpHeaders({
      Authorization: `Token ${this.xToken}`,
    });
    return this.http.post<any>(this.url + 'api/blogpost/', post, {
      headers: headers,
    });
  }


  deletePost(id: number) {
    return this.http
      .delete(this.url + 'api/blogpost/' + id + '/')
      .pipe(
        tap((e) => {
          console.log('e :>> ', e);
        })
      );
  }


}
