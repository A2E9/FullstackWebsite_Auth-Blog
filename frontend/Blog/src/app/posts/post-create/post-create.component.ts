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
  token:any;

  constructor(private formBuilder: FormBuilder, private blogPost: BlogPostService, private localStore: LocalService, private router: Router) {}

  ngOnInit(): void {
    
    this.blogForm = this.formBuilder.group({
     user: this.localStore.getData('user_id'),
     // id: this.localStore.getData('user'),
      body: new FormControl('', [
        // Validators.required,
        // Validators.minLength(3),
        Validators.maxLength(200),
        // Validators.pattern('^[a-zA-Z0-9]+$'),
      ]),
      
    });
    
  }
  onSubmit() {
    // console.log('this.localStore.getData(user_id) :>> ', this.localStore.getData('user_id'));
    // console.log('this.blogForm.value :>> ', this.blogForm.value);
    this.blogPost.createPost(this.blogForm.value).subscribe((data: any) => {
      console.log(data);
    }
    );
    this.onCancel();
  }
  onCancel() {
    this.blogForm.reset();
    this.router.navigate(['/home/post-list']);
  }
}
