import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AuthService } from './core/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './core/interceptors/jwt-interceptor.service';
import { PostsAllComponent } from './components/posts/posts-all/posts-all.component';
import { PostInfoComponent } from './components/posts/post-info/post-info.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
   PostsAllComponent,
   PostInfoComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi : true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
