import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url ='https://localhost:44369/api/';

  constructor(private http: HttpClient) { }

  getPosts(){
    return this.http.get(`${this.url}posts`);
  }
}
