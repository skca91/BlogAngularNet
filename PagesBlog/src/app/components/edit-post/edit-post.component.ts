import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  post: any;

  constructor(private activedRoute: ActivatedRoute,
              private router: Router,
              private postService: PostService) { 

      this.activedRoute.params.subscribe( params => {
          this.postService.getPost( params['id']).subscribe( resp => {
            this.post = resp;
          });
      });
  }

  ngOnInit(): void {
  }

  editPost(f : NgForm){

    if(f.invalid){ return; }

    this.postService.editPost(this.post.id, this.post).subscribe( resp => {
      this.router.navigate(['post', this.post.id]);

    }, (error) => {
      console.log(error);
    });

  }

}
