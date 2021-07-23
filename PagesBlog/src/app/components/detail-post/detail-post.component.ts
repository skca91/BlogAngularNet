import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {

  post: any;

  constructor(private activedRoute: ActivatedRoute,
              private postService: PostService) {

      this.activedRoute.params.subscribe( params => {
        this.postService.getPost( params['id']).subscribe( resp => {
          this.post = resp;
        })
      })
  }

  ngOnInit(): void {
  }

}
