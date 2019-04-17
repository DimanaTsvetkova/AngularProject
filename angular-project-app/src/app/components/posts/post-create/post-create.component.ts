import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostServiceService } from 'src/app/core/services/post-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  form 
  constructor(
    private fb: FormBuilder,
    private postService: PostServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      destination:['',[Validators.required,Validators.minLength(3), Validators.maxLength(15)]],
      imageUrl:['',[Validators.required, Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)]],
      creator: [localStorage.getItem('userId')]
    })
  }

  createPost(){
    this.postService.createPost(this.form.value)
    .subscribe((data)=>{
      console.log(data)
      this.router.navigate(['post/all'])
    })
  }

  get f(){
    return this.form.controls
  }

}
