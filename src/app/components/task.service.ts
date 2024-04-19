import { Injectable } from "@angular/core";
import { Task } from "../models/tasks";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TaskService {
    url = 'http://localhost:3000/tasks';

    constructor(private http:HttpClient){}

    getTask():Observable<Task[]>{
        return this.http.get<Task[]>(this.url)
    }

    createTask(task:Task):Observable<Task>{
        
        return this.http.post<Task>(this.url, task)
    }

    updateTask(id:string,data:string):Observable<Task>{
        const status = {
            status:data
        }
        const url = this.url + '/' + id + '/' + 'status'
        return this.http.patch<Task>(url, status)
    }

    deleteTask(id:string){
        const url = this.url + '/' + id
        return this.http.delete(url)
    }


}