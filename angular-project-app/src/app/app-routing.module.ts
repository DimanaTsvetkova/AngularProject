import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { PostsAllComponent } from './components/posts/posts-all/posts-all.component';
import { PostsMineComponent } from './components/posts/posts-mine/posts-mine.component';
import { PostsWishlistComponent } from './components/posts/posts-wishlist/posts-wishlist.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AnonymousGuard } from './core/guards/anonymous.guard';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard] },
  { path: 'post/create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'post/all', component: PostsAllComponent },
  { path: 'post/all/:id', component: PostsAllComponent, canActivate: [AdminGuard] },
  { path: 'post/mine/:id', component: PostsMineComponent, canActivate: [AuthGuard] },
  { path: 'post/wishist/:id', component: PostsWishlistComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
