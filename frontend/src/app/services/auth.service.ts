import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = 'http://localhost:3000/api/auth';

  constructor(private _http: HttpClient, private userService: UserService, private cookies: CookieService) { }

  login(email: string, password: string): Observable<any> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = {
      email: email,
      password: password
    }
    return this._http.post(this._url + '/login', body, options);
  }

  setToken(token: string): void {
    this.cookies.set('token', token);
  }

  getToken(): string {
    return this.cookies.get('token');
  }

  isLoggedIn(): boolean {
    return this.cookies.check('token');
  }

  getUserLoggedIn(): Observable<any> {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      }
    }
    return this._http.get(this._url + '/user', options);
  }


  logout(): void {
    this.cookies.delete('token');
  }

}
