import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _url = 'http://localhost:3000/api/posts'
  constructor(private _http: HttpClient) { }

  getPosts():Observable<any> {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return this._http.get(this._url, options)
  }

  getPost(slug:string):Observable<any> {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return this._http.get(this._url + '/slug/' + slug, options)
  }

  createPost(post:Post):Observable<any> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const body = JSON.stringify(post)
    return this._http.post(this._url, body, options)
  }

  getRecentPosts():Observable<any> {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return this._http.get(this._url + '/time/recent', options)
  }

  getPublishedPosts():Observable<any> {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return this._http.get(this._url + '/published', options)
  }
}
