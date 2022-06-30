import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user!:User
  constructor(private authService: AuthService, private userService: UserService, private activatedRoute: ActivatedRoute, private router:Router) {
    this.user = new User()
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['username']){

        this.userService.getUser(params['username']).subscribe(user => {
          this.user = user
        })
      }
    })
    
  }

}
