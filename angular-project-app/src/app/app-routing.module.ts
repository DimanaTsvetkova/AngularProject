import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AnonymousGuard } from './core/guards/anonymous.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard] },
  { path:'post', loadChildren: './components/posts/posts.module#PostsModule'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
