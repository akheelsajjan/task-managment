import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { token, User } from '../models/auth';
import { ErrorResponse } from '../models/auth';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   url = 'http://localhost:3000/auth/'
  constructor(private http:HttpClient) { }

  signUp(data:User){
    let signUpUrl= this.url + 'signup'
    return this.http.post<void | ErrorResponse>(signUpUrl,data)
    

     
  }

  login(data:User){
    let signUpUrl= this.url + 'signIn'
    return this.http.post<token | ErrorResponse>(signUpUrl,data)
  }
}
