import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/Post';
import { PostServiceService } from 'src/app/core/services/post-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts-mine',
  templateUrl: './posts-mine.component.html',
  styleUrls: ['./posts-mine.component.css']
})
export class PostsMineComponent implements OnInit {
  myPosts: Array<Post>;
  username: string;
  constructor(
    private postService: PostServiceService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.route.params.subscribe(data=>{
      let id = data['id']
      console.log(id)
      this.postService.getMyPosts()
      .subscribe(data=>{
        console.log(data)
        this.myPosts = data['user']['userPosts']
      })
    })
  }

}
