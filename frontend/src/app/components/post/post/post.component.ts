import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post!:Post
  safeContent!: SafeHtml
  constructor(private postService: PostService, private authService: AuthService, private activatedRoute: ActivatedRoute,  private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['slug']){
        this.postService.getPost(params['slug']).subscribe(post => {
          this.post = new Post()
          Object.assign(this.post, post)
          this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.post.content)
        })
      }
    })
  }

}
