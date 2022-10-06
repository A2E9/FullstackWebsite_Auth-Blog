import { Component, OnInit } from '@angular/core';
import { BlogPostService } from 'src/app/services/blog-post.service';
import { Post } from 'src/app/Post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts!: Post[];
  blockedPanel: boolean = false;
  constructor(private blogService: BlogPostService) {
    this.blogService.getPosts()
    .subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    });
    // this.blogService.getPostsAll().then((posts: any) => this.posts = posts);
    // console.log(this.posts);
  }

  ngOnInit(): void {}
}
// getPosts(this: any) {
//   this.blogService.getPosts().subscribe((data: any) => {
//     console.log(data);
//     this.posts = data;
//   });
// }
