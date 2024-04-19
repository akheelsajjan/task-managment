import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TaskManagementComponent } from './components/task-managment/task-managment.component';
import { TaskComponent } from './components/task/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginService } from './components/login.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './guard/auth.guard'


export const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
},

{
    path:'task',
    canActivate: [AuthGuard],
    component:TaskComponent
},
{
  path:'',
  redirectTo:'login',
  pathMatch:'full'
},
{
    path:"**",
    component:LoginComponent
},

  
];

@NgModule({
  imports:      [ 
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
 ],
  providers:    [ 
    LoginService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
  } 
],
  declarations: [ 
    AppComponent,
    LoginComponent,
    TaskManagementComponent,
    TaskComponent

],
  exports:      [  ],
  bootstrap:    [ AppComponent]
})
export class AppModule { }