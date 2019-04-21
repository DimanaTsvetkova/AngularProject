import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/core/models/post';
import { PostServiceService } from 'src/app/core/services/post-service.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posts-all',
  templateUrl: './posts-all.component.html',
  styleUrls: ['./posts-all.component.css']
})
export class PostsAllComponent implements OnInit, OnDestroy {
  allPosts$: Observable<Array<Post>>
  currentWishlist: Array<Post>;
  isAdmin: boolean;

  subscription: Subscription[];

  constructor(
    private route: Router,
    private authService: AuthService,
    private postService: PostServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
   this.allPosts$ = this.postService.getAllPosts();
   this.isAdmin = this.authService.isAdmin();
  }

  addToWishlist(postId:string) {

    if (!this.authService.isAuthenticated()) {
      return this.route.navigate(['login']);
    }
    
  this.postService.getWishlist()
      .subscribe(data => {
        this.currentWishlist = data['user']['wishlist'];
        
          let finalWishlist = this.currentWishlist.map((el) => {
          return el._id.toString()
        })

        if (finalWishlist.includes(postId)) {
          this.toastr.success("Aleready added to wishlist")
          // return this.message =  "
        } else {

          const userId = localStorage.getItem('userId')
          this.toastr.success("Successfuly added to wishlist")

          this.postService.likePost(postId, userId)
            .subscribe(data => {
              console.log(data)
            })
        }
      })
  }

 
  deletePost(postId:string){
    this.toastr.success("Post deleted")

  this.subscription.push(this.postService.deletePost(postId).subscribe((data)=>{
      console.log(data)
    }))
  }

  ngOnDestroy(){
    if(this.subscription){
    this.subscription.forEach(subscr =>{
      if(subscr){
        subscr.unsubscribe()
      }
    })
  }
  }


}
