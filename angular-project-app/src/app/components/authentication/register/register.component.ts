import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form
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

    console.log(this.f.username)
  }
  
  register(){
    console.log('here')
    this.authService.register(this.form.value)
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

}
