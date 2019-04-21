import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostServiceService } from 'src/app/core/services/post-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  form;
  subscription : Subscription;

  constructor(
    private fb: FormBuilder,
    private postService: PostServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      destination:['',[Validators.required,Validators.minLength(3), Validators.maxLength(15)]],
      imageUrl:['',[Validators.required, Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)]],
      creator: [localStorage.getItem('userId')]
    })
  }

  createPost(){

    this.subscription = this.postService.createPost(this.form.value)
    .subscribe((data)=>{
      console.log(data)
    this.toastr.success("Post added successfully!")

      this.router.navigate(['post/all'])
    })
  }

  get f(){
    return this.form.controls
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

}
