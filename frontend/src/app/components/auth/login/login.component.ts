import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import * as CryptJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: User

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.user = new User()
    this.user.email = ""
    this.user.password = ""
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data:any) => {
        if (data.logout) {
          this.authService.logout()
          window.location.href = '/login'
        }
        else if(this.authService.isLoggedIn()) {
          this.router.navigate(['/'])
        }
    })
  }

  login() {
    this.authService.login(this.user.email, this.user.password).subscribe(
      (result) => {
        this.authService.setToken(result.jwt)
        window.location.href = '/'
      }
    )
  }

}
