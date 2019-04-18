import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/core/models/Post';
import { PostServiceService } from 'src/app/core/services/post-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-wishlist',
  templateUrl: './posts-wishlist.component.html',
  styleUrls: ['./posts-wishlist.component.css']
})
export class PostsWishlistComponent implements OnInit, OnDestroy {
  wishlist:Array<Post>;
  username: string;
  subscription: Subscription;

  constructor(
    private postService: PostServiceService,
    ) { }

  ngOnInit() {
     this.username = localStorage.getItem('username')
    this.subscription =  this.postService.getWishlist()
      .subscribe(data=>{
        this.wishlist = data['user']['wishlist']
      })
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }
 
}
