import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url ='https://localhost:44369/api/';

  constructor(private http: HttpClient) { }

  getPosts(){
    return this.http.get(`${this.url}posts`);
  }

  getPost(id: number){
    return this.http.get(`${this.url}posts/${id}`);
  }

  newPost(post: PostModel){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(post);
    return this.http.post(`${this.url}posts`, body, {'headers':headers});
  }

  editPost(id:number, post: any){
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify(post);
    return this.http.put(`${this.url}posts/${id}`, body, {'headers':headers} );
  }

  deletePost(id: number){
    return this.http.delete(`${this.url}posts/${id}`);
  }
}
