import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IgxPaginatorComponent, IgxToastComponent } from 'igniteui-angular';
import { Comment } from 'src/app/models/comment';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post!:Post
  safeContent!: SafeHtml
  comment!:Comment
  @ViewChild('toast', {static:true}) toast!:IgxToastComponent

  @ViewChild('paginator', { static: true }) public paginator!: IgxPaginatorComponent;

  constructor(private postService: PostService, private authService: AuthService, private activatedRoute: ActivatedRoute,  private sanitizer: DomSanitizer, private commentService: CommentService, private router: Router) { 
    this.post = new Post()
    this.post.user = new User()
    this.post.comments = new Array<Comment>()
    this.initComment()
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['slug']){
        this.postService.getPost(params['slug']).subscribe(post => {
          if(post){
            this.post = post
            this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.post.content)
          }
          else{
            setTimeout(() => {
              this.router.navigate(['/404'], { skipLocationChange: true })
            }, 0)
          }
        }, err => {
          this.router.navigate(['/404'])
        })
      }
    })
  }
  
  initComment(){
    this.comment = new Comment()
    this.comment.post = this.post
    this.comment.user = new User()
  }

  addComment(){
    if(!this.comment.content || this.comment.content.length < 1){
      this.toast.textMessage = "Please enter a comment"
      this.toast.displayTime = 1000
      this.toast.open()
      return
    }
    this.authService.getUserLoggedIn().subscribe(
      user => {
        this.comment.user = user
        this.comment.post = this.post
        this.commentService.createComment(this.comment).subscribe(res => {
          if(res.comment){
            this.post.comments.push(res.comment)
            this.postService.updatePost(this.post).subscribe()
            window.location.reload()
          }
        })
      }
    )
  }

  public comments():Array<Comment>{
    let comments = this.post.comments
    if(this.paginator){
      comments = comments.slice(this.paginator.page * this.paginator.perPage, (this.paginator.page + 1) * this.paginator.perPage)
      return comments
    }
    return this.post.comments
  }

  public navigateToFirstPage() {
    this.paginator.page = 0;
}


}
