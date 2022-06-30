import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  IgxNavigationDrawerComponent
} from 'igniteui-angular'
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!:User

  constructor(private router: Router, public authService: AuthService) {
    this.user = new User() // create a new user object
  }

  @ViewChild(IgxNavigationDrawerComponent, { static: true })
  public drawer!: IgxNavigationDrawerComponent;

  public navItems = [
    { name: 'home', text: 'Home', redirect: '/', active: true },
    { name: 'account_circle', text: 'Profile', redirect: '/profile', active: this.authService.isLoggedIn() },
    { name: 'login', text: 'Login', redirect: '/login', active: !this.authService.isLoggedIn() },
    { name: 'logout', text: 'Logout', redirect: '/logout', active: this.authService.isLoggedIn() },
    { name: 'add', text: 'Register', redirect: '/register', active: !this.authService.isLoggedIn() },
  ]

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.authService.getUserLoggedIn().subscribe(user => {
        Object.assign(this.user, user)
      })
    }
  }

  redirectTo(path: string){
    if(path == '/profile') path = '/user/' + this.user.username
    // refresh the page with the router and navigate to the path
    this.router.onSameUrlNavigation = 'reload';
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // close the drawer
    this.drawer.close()

    this.router.navigate([path])
  }
}
