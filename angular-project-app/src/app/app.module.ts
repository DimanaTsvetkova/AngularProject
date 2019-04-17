import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AuthService } from './core/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './core/interceptors/jwt-interceptor.service';
import { PostsAllComponent } from './components/posts/posts-all/posts-all.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { PostServiceService } from './core/services/post-service.service';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { PostsMineComponent } from './components/posts/posts-mine/posts-mine.component';
import { PostsWishlistComponent } from './components/posts/posts-wishlist/posts-wishlist.component';
import { PostInfoComponent } from './components/posts/post-info/post-info.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostsAllComponent,
    PostCreateComponent,
    LoginComponent,
    RegisterComponent,
    PostsMineComponent,
    PostsWishlistComponent,
    PostInfoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    PostServiceService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
