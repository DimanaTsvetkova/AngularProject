import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  constructor(public authService: AuthService, private router: Router) { }

  
  ngOnInit() {
   console.log(this.authService.getUserData()['userId'])
  }


  logout(){
    this.authService.logout();
    this.router.navigate(['login'])
  }
}
