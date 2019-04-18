import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form;
  subscription : Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  login(){
   
   try{ this.subscription =
    this.authService
    .login(this.form.value)
    .subscribe((data)=>{
      const {imageUrl, userId, username} = data['user'];
      localStorage.setItem('imageUrl', imageUrl)
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username)
      console.log(data)
      
      this.router.navigate(['post/all'])
    })
  }catch(err){
    console.log(err)
  }
  }

  get f(){
    return this.form.controls
  }

  ngOnDestroy(){
    if(this.subscription){

      this.subscription.unsubscribe();
    }
  }
}
