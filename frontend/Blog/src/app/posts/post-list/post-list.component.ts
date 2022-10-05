import { Component, OnInit } from '@angular/core';
import { BlogPostService } from 'src/app/services/blog-post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: any;
  constructor(private blogService: BlogPostService) {
    this.blogService.getPosts().subscribe((data: any) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  ngOnInit(): void {}
}
// getPosts(this: any) {
//   this.blogService.getPosts().subscribe((data: any) => {
//     console.log(data);
//     this.posts = data;
//   });
// }
