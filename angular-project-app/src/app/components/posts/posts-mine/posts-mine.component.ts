import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/core/models/Post';
import { PostServiceService } from 'src/app/core/services/post-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-mine',
  templateUrl: './posts-mine.component.html',
  styleUrls: ['./posts-mine.component.css']
})
export class PostsMineComponent implements OnInit, OnDestroy {
  myPosts: Array<Post>;
  username: string;
  subscription: Subscription;
  constructor(
    private postService: PostServiceService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.subscription = this.route.params.subscribe(data=>{
      let id = data['id']
      this.postService.getMyPosts()
      .subscribe(data=>{
        this.myPosts = data['user']['userPosts']
      })
    })
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }
}
