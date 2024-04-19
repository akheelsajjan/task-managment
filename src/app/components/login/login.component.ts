import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorResponse, token, User } from '../../models/auth';
import { catchError, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  user:User = {
    userName: '',
    password: ''
  }
  errors:string = ''


  constructor(
    private login:LoginService, private fb: FormBuilder,
    private router:Router
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
      
  }
  userDetails(){
    this.errors = ''
    if (this.loginForm.valid) {
       this.user = {
           userName: this.loginForm.get('userName')?.value,
          password: this.loginForm.get('password')?.value
      }
      
    }
  }

  onSignUp() {
    this.userDetails()
    this.login.signUp(this.user)
    .pipe(
      map(data => {
        if( data == null){
          window.alert('Sign In successful...')
        }else{
          this.errors = data.message[0] 
          console.log(data)
        }
        return data;
      }),
      catchError((data)=> this.handleError(data))
    ).subscribe()
  }

  onLogin(){
    this.userDetails()
    this.login.login(this.user)
    .pipe(
      map(data => {
        const token = data as token
        console.log(token)
        localStorage.setItem('loginToken',token.accessToken )
        this.router.navigateByUrl('task');
        return data;
      }),
      catchError((data)=> this.handleError(data))
    ).subscribe()
  }

  handleError(data:any){
    let error = data['error'] as ErrorResponse
    if(typeof error.message === 'string'){
      this.errors = error.message
    } else{
      this.errors = error.message[0]
    }
    return data
  }
}
