import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TaskManagementComponent } from './components/task-managment/task-managment.component';

export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'',
        component:TaskManagementComponent,
        children:[
            {
                path:'task-management'
            }
        ]
        
    },
    {
        path:"*",
        component:LoginComponent
    }
    
];


