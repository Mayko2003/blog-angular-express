import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import * as CryptJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { IgxToastComponent } from 'igniteui-angular';
import { passwordStrength } from 'check-password-strength'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user!: User
  invalidAvatar: boolean = true
  passwordStatus: boolean = false
  @ViewChild('toast', { static: true }) toast!: IgxToastComponent;
  constructor(private userService: UserService, private router: Router, private authService: AuthService) {
    this.user = new User()
    this.user.avatar = ""
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/'])
    }
  }

  getFile(e: any) {

    var allowedExtensions = ["png", "jpeg", "gif"]

    //size
    if (e.target.files[0].size / 1024 / 1024 > 8) {
      this.toast.textMessage = "File size must be less than 8MB"
      this.toast.displayTime = 1000
      this.toast.open()
      this.invalidAvatar = true
      e.target.value = null
      e.path[1].innerText = "No file chosen"
      return;
    }

    //extension
    var nam: string = e.target.files[0].name.split('.').pop()
    if (!allowedExtensions.includes(nam)) {
      this.toast.textMessage = "File extension must be png, jpeg or gif"
      this.toast.displayTime = 1000
      this.toast.open()
      this.invalidAvatar = true
      e.target.value = null
      e.path[1].innerText = "No file chosen"
      return;
    }

    //convert to base64
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    let base64 = ""
    reader.onload = () => {
      if (reader.result != null) {
        base64 = reader.result.toString()
        this.user.avatar = base64
      }
    }
    this.invalidAvatar = false
  }

  register() {
    const pass = CryptJS.AES.encrypt(this.user.password, environment.password_key).toString()
    this.userService.createUser(this.user, pass).subscribe(res => {
      this.router.navigate(['/login'])
    }, err => {
      if (err.error.username) {
        this.toast.textMessage = "Username already exists"
        this.toast.displayTime = 1000
        this.toast.open()
      }
      var id = setInterval(() => {
        if (err.error.email) {
          this.toast.textMessage = "Email already in use"
          this.toast.displayTime = 1000
          this.toast.open()
        }
        clearInterval(id)
      }, 1000)
    })
  }

  verifyPassword(){
    this.passwordStatus = false
    const status = passwordStrength(this.user.password)
    const passBar = document.getElementById('password-bar') as HTMLElement
    if(status.id == 0){
      passBar.style.width = '25%'
      passBar.classList.value = 'progress-bar bg-danger'
    }
    else if(status.id == 1){
      passBar.style.width = '50%'
      passBar.classList.value = 'progress-bar bg-warning'
    }
    else if(status.id == 2){
      passBar.style.width = '75%'
      passBar.classList.value = 'progress-bar bg-info'
    }
    else{
      passBar.style.width = '100%'
      passBar.classList.value = 'progress-bar bg-success'
      this.passwordStatus = true
    }
  }

}
