import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AuthService } from './core/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './core/interceptors/jwt-interceptor.service';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
   
    LoginComponent,
    RegisterComponent,
  
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
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
