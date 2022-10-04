import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, private blogPost: BlogPostService, private localStore: LocalService) {}

  ngOnInit(): void {
    this.blogForm = this.formBuilder.group({
      bodyText: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ]),
      user_id: this.localStore.getData('user_id'),
    });
    
  }
  onSubmit() {
    console.log(this.blogForm.value);
    this.blogPost.createPost(this.blogForm.value).subscribe((data: any) => {
      console.log(data);
    }
    );
  }
}
