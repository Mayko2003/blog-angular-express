import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url = 'http://localhost:3000/api/users';

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<any> {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return this._http.get(this._url, options);
  }

  getUser(username: string): Observable<any> {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return this._http.get(this._url+'/user/'+username, options);
  }

  createUser(user: any): Observable<any> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify(user);
    return this._http.post(this._url, body, options);
  }

  updateUser(user: any): Observable<any> {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify(user);
    return this._http.put(this._url+'/'+user._id, body, options);
  }

  inactivateUser(id: string): Observable<any> {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return this._http.delete(this._url+'/'+id, options);
  }

}
