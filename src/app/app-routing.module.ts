import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TaskManagementComponent } from './components/task-managment/task-managment.component';
import { TaskComponent } from './components/task/task.component';

export const routes: Routes = [
  {
      path:'login',
      component:LoginComponent
  },

  {
      path:'task',
      component:TaskComponent
  },
  {
      path:"**",
      component:LoginComponent
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
},
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
