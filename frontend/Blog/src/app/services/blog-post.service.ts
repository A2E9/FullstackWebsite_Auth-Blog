import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, async, from, tap, window } from 'rxjs';
import { Post } from '../Post';
import { LocalService } from './local.service';
import { IndexedDbService } from './indexed-db.service';import { mergeMap, toArray } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  private url = 'http://localhost:8000/';

  xToken: any = this.localStore.getItem('user', true)?.token;

  mydata = {
    da: 2,
    d2a: 3,
  };

  constructor(
    private http: HttpClient,
    private localStore: LocalService,
    private router: Router,
    private indexDB: IndexedDbService
  ) {}

  getPosts(): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Token ${this.xToken}`,
    });
    console.log("Getting...")
    return this.http
      .get<Post[]>(this.url + 'api/blogpostlist/', {
        headers: headers,
      })
      .pipe(
        tap((e) => {
          console.log('e: ', e)
          e.forEach((post) => {
            let d = {
              id: post.id,
              value: JSON.stringify(post),
            };
            this.indexDB.createData(d);
          });
        })
      );
  }
  

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
    return this.http.delete(this.url + 'api/blogpost/' + id + '/').pipe(
      tap((e) => {
        console.log('e :>> ', e);
      })
    );
  }
  async storeData() {
    const data = { id: '1', value: 'This is a single line of data.' };
    await this.indexDB.createData(data);
  }
}
