import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  login(){
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
  }

}
