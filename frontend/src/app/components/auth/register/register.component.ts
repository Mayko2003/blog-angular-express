import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import * as CryptJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user!:User
  upload: boolean = false
  constructor(private userService:UserService, private router:Router, private authService: AuthService) { 
    this.user = new User()
    this.user.avatar = ""
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/'])
    }
  }

  getFile(e:any){

    var allowedExtensions = ["png","jpeg","gif"]
    
    //size
    if(e.target.files[0].size / 1024 / 1024 > 8){
      alert("File size should be less than 8MB")
      this.upload = false
      return;
    }

    //extension
    var nam:string = e.target.files[0].name.split('.').pop()
    if(!allowedExtensions.includes(nam)){
      alert("Extension not valid, only allow png, pjeg or gift")
      this.upload = false
      return;
    }

    //convert to base64
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    let base64 = ""
    reader.onload = () => {
      if(reader.result != null){
        base64 = reader.result.toString()
        this.user.avatar = base64
      }
    }
    this.upload = true
  }

  register(){
    this.user.password = CryptJS.AES.encrypt(this.user.password, environment.password_key).toString()
    this.userService.createUser(this.user).subscribe()
  }

}
