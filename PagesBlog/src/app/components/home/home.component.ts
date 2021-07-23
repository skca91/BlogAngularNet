import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any;

  constructor(private postService: PostService,
              private router: Router) { 
      this.load();
  }

  ngOnInit(): void {
  }

  load(){
    this.postService.getPosts().subscribe( resp => {
      this.posts = resp;
    });
  }

  edit(id: number){
    this.router.navigate(['edit-post', id]);
  }

  delete(id:number){

    this.postService.deletePost(id).subscribe( resp => {
      this.load();
    },(error) => {

      console.log(error);
    });
  }

}
