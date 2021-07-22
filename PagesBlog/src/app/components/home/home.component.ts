import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any;

  constructor(private postService: PostService) { 

    this.postService.getPosts().subscribe( resp => {
      console.log(resp);
    });

  }

  ngOnInit(): void {
  }

}
