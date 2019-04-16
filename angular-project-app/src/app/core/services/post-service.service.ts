import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private readonly postsUrl = 'http://localhost:9999/post';

  constructor(private http:HttpClient) { }

  getAllPosts(): Observable<Array<Post>>{
    return this.http.get<Array<Post>>(this.postsUrl+'/all')
      .pipe(map(el => el['posts']), tap(console.log));
  }

  createPost(body): Observable<Post>{
    return this.http.post<Post>(this.postsUrl + '/create', body)
  }
  
  likePost(postId, userId){
    return this.http.put(this.postsUrl + '/all', {postId, userId})
  }

  getMyPosts(){
    const userId = localStorage.getItem('userId')
    return this.http.get(this.postsUrl + `/mine/${userId}` );
  }

 
  getWishlist(){
    const userId = localStorage.getItem('userId')
    return this.http.get(this.postsUrl + `/wishlist/${userId}` );

  }

  deletePost(postId){
    return this.http.delete(this.postsUrl + `/all/${postId}`);
  }

}
