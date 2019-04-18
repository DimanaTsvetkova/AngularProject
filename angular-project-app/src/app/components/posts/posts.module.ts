import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsMineComponent } from './posts-mine/posts-mine.component';
import { PostsWishlistComponent } from './posts-wishlist/posts-wishlist.component';
import { PostInfoComponent } from './post-info/post-info.component';
import { PostsAllComponent } from './posts-all/posts-all.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostServiceService } from 'src/app/core/services/post-service.service';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
      { path: 'all', component: PostsAllComponent },
      { path: 'all/:id', component: PostsAllComponent, canActivate: [AdminGuard] },
      { path: 'mine/:id', component: PostsMineComponent, canActivate: [AuthGuard] },
      { path: 'wishist/:id', component: PostsWishlistComponent, canActivate: [AuthGuard] }
    ])
  ],
  declarations: [
    PostsMineComponent,
    PostsWishlistComponent,
    PostInfoComponent,
    PostsAllComponent,
    PostCreateComponent,
  ],
  providers: [
    PostServiceService,

  ]
})
export class PostsModule { }
