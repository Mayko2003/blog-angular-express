import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private _url = environment.backend_url + '/api/comments'
  constructor(private _http: HttpClient) { }

  createComment(comment: Comment): Observable<any> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const body = JSON.stringify(comment)
    return this._http.post(this._url, body, options)
  }
}
