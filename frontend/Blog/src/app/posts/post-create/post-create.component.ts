import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogPostService } from 'src/app/services/blog-post.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  blogForm: any;
  token: any;
  user!: any;
  userId!: any;
  constructor(
    private formBuilder: FormBuilder,
    private blogPost: BlogPostService,
    private localStore: LocalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('3')
    this.user = this.localStore.getItem('user',true) || '';
    this.userId = this.user.user_info.id;

    this.blogForm = this.formBuilder.group({
      user: this.userId,
      body: new FormControl('', [
        // Validators.required,
        // Validators.minLength(3),
        Validators.maxLength(200),
        // Validators.pattern('^[a-zA-Z0-9]+$'),
      ]),
    });
  }
  onSubmit() {
    this.blogPost.createPost(this.blogForm.value).subscribe((data: any) => {
      console.log(data);
    });
    this.onCancel();
  }
  onCancel() {
    this.blogForm.reset();
    this.router.navigate(['/home/post-list']);
  }
}
