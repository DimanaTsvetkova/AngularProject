import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/Post';
import { PostServiceService } from 'src/app/core/services/post-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts-wishlist',
  templateUrl: './posts-wishlist.component.html',
  styleUrls: ['./posts-wishlist.component.css']
})
export class PostsWishlistComponent implements OnInit {
  wishlist:Array<Post>;
  username: string;
  constructor(
    private postService: PostServiceService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
     this.username = localStorage.getItem('username')
      this.postService.getWishlist()
      .subscribe(data=>{
       
        console.log(data)
        this.wishlist = data['user']['wishlist']
      })
  }

 
}
