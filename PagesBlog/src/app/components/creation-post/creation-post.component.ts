import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-creation-post',
  templateUrl: './creation-post.component.html',
  styleUrls: ['./creation-post.component.css']
})
export class CreationPostComponent implements OnInit {

  post: PostModel = new PostModel();

  constructor(private postService: PostService,
              private router: Router) { }

  ngOnInit(): void {
  }

  newPost(f: NgForm){

    if(f.invalid){ return; }

    console.log(this.post);

    this.postService.newPost(this.post).subscribe( resp => {
      this.router.navigateByUrl('/');
    }, (error) => {
      console.log(error);
    });
  }


}
