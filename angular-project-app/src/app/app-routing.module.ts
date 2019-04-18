import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonymousGuard } from './core/guards/anonymous.guard';
import { PostsAllComponent } from './components/posts/posts-all/posts-all.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'post/all' },
  { path: 'auth', loadChildren: './components/authentication/auth.module#AuthModule', canActivate: [AnonymousGuard] },
  { path: 'post/all', component: PostsAllComponent },
  { path: 'all/:id', component: PostsAllComponent, canActivate: [AdminGuard] },
  { path: 'post', loadChildren: './components/posts/posts.module#PostsModule',  canActivate: [AuthGuard]  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
