import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form;
  subscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username:['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      imageUrl: [''],
      password:['',[Validators.required, Validators.minLength(4)]]
    })
  }
  
  register(){
   this.subscription = this.authService.register(this.form.value)
    .subscribe((data)=>{
      console.log(data)
      const {imageUrl, userId, username} = data['user'];
      localStorage.setItem('imageUrl', imageUrl)
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username)

      this.router.navigate(['post/all'])
    })
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
