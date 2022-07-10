import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  post!:Post
  constructor(private authService: AuthService, private postService: PostService, private router:Router) {
    this.post = new Post()
    
  }
  editor!:any

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.authService.getUserLoggedIn().subscribe(user => {
        this.post.user = new User()
        Object.assign(this.post.user, user)
      })
      ClassicEditor.create(document.querySelector('#ckeditor'), {
        cloudServices: {
          tokenUrl: environment.ckeditor_token_url,
          uploadUrl: environment.ckeditor_upload_url
        },
        placeholder: "Write your post here...",
      }).then((editor:any) => {
        this.editor = editor
      }).catch((error:any) => {
        console.log(error)
      })
    }
    else {
      this.router.navigate(['/login'])
    }
  }

  save(status:string, element?:any) {
    this.post.status = status
    this.post.slug = this.post.title.toLowerCase().replace(/ /g, '-') + '-' + this.post.user.username
    this.post.content = this.editor.getData()
    this.postService.createPost(this.post).subscribe(result =>{
      this.router.navigate(['/'])
    }, error => {
      element.open()
    })
  }

}
