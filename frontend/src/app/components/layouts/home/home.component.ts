import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { IgxPaginatorComponent, IgxToastComponent } from 'igniteui-angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentPosts!:Post[]

  @ViewChild('toast', {static: true}) toast!: IgxToastComponent;
  
  @ViewChild('paginator', { static: true }) public paginator!: IgxPaginatorComponent;

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

  getRecentPosts():Post[]{
    let posts = this.recentPosts
    if(this.paginator){
      posts = posts.slice(this.paginator.page * this.paginator.perPage, (this.paginator.page + 1) * this.paginator.perPage)
      return posts
    }
    return posts
  }

  navigateToFirstPage(){
    this.paginator.page = 0
  }


}
