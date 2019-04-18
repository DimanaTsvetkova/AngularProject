import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsMineComponent } from './posts-mine/posts-mine.component';
import { PostsWishlistComponent } from './posts-wishlist/posts-wishlist.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostServiceService } from 'src/app/core/services/post-service.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'create', component: PostCreateComponent },
      { path: 'mine/:id', component: PostsMineComponent },
      { path: 'wishist/:id', component: PostsWishlistComponent,}
    ])
  ],
  declarations: [
    PostsMineComponent,
    PostsWishlistComponent,
    PostCreateComponent,
  ],
  providers: [
    PostServiceService,

  ]
})
export class PostsModule { }
