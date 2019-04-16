import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  private readonly loginUrl = 'http://localhost:9999/auth/login';
  private readonly registerUrl = 'http://localhost:9999/auth/register';

  constructor(
    private http : HttpClient
  ) {  }

  register(body) {
    return this.http.post(this.registerUrl, body);
  }

  login(body) {
    return this.http.post(this.loginUrl, body);
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    return localStorage.getItem('userId') !== null;
  }

  isAdmin(){
    return localStorage.getItem('username') === 'Admin'
  }

  getUserData(){
    const userId = localStorage.getItem('userId');
    const imageUrl = localStorage.getItem('imageUrl');

    return {userId, imageUrl}
  }
  getToken(){
    return localStorage.getItem('token');
  }
}