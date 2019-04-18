import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { Post } from 'src/app/core/models/Post';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.css']
})
export class PostInfoComponent {
  @Input() post: Post;
  @Input() isAdmin: boolean;
  @Output() isInWishlist = new EventEmitter();
  @Output() onAddToWhishlist = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();

  addToWishlist(id: string) {
    this.onAddToWhishlist.emit(id);
  }
  deletePost(id:string){
    this.onDelete.emit(id);
  }

 

}
