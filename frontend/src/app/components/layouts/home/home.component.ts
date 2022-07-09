import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { IgxToastComponent } from 'igniteui-angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentPosts!:Post[]

  @ViewChild('toast', {static: true}) toast!: IgxToastComponent;

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
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/post', slug])
    }
    else{
      //open the toast component
      this.toast.open()
    }

  }


}
