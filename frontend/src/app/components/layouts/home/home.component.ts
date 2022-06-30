import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentPosts!:Post[]

  constructor(public authService: AuthService, private router:Router, private postService: PostService) {
  }

  ngOnInit(): void {
    if(this.router.url === '/logout'){
      this.authService.logout()
      window.location.href = '/'
    }

    this.postService.getRecentPosts().subscribe(posts => {
      this.recentPosts = []
      Object.assign(this.recentPosts, posts)
    })
  }

  readMore(slug:string){
    this.router.navigate(['/post', slug])
  }


}
