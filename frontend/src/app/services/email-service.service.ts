import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  private urlBase = 'http://localhost:3000/api/emails'
  constructor(private http:HttpClient) { }

  sendEmail(email:string, text:string):Observable<any>{
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const body = {
      email: email,
      text: text
    }
    return this.http.post(this.urlBase + '/send', body, options)
  }

}
