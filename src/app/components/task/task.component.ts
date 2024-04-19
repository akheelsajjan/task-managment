import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../../models/tasks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';

const ADD_TASK = 'Add Task'
const UPDATE_TASK = 'Update'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  providers: [TaskService],
})
export class TaskComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('addTaskButton')
  addTaskButton!: ElementRef;

  showTasks = new BehaviorSubject<boolean>(true);
  task$ = new Observable<Task[]>
  taskForm!: FormGroup;
  titleError:string = '';
  descriptionError:string = '';
  TaskList:Task[] = [];
  taskButton:string = ADD_TASK;
  newUpdateTask:Task = {
    title:'',
    description:'',
    id:'',
    status:''
  }

  private readonly _destroy$ = new Subject<void>();

  constructor(private taskService: TaskService, private fb: FormBuilder, private router:Router) {}


  ngOnInit(): void {
    this.getTask()
    this.taskForm = this.fb.group({
      title: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      status: ['', Validators.required],
    });
    if (!this.taskForm.get('status')?.value) {
      this.taskForm.patchValue({
        status: 'OPEN',
      });
    }

  }

  ngAfterViewInit(): void {
    this.addTaskButton.nativeElement.focus();
  }

  addTask():void{
    this.showTasks.next(false);
    this.taskButton = ADD_TASK
  }

  showTask():void{
    this.showTasks.next(true)
  }

  getTask(){
   this.task$ = this.taskService.getTask()
   .pipe(
    map((data)=>{
      console.log(data);
      this.TaskList = data
      return data
    })
   )
  }

  createTask(taskButton:string) {
    const newTask: Task = {
      title: this.taskForm.get('title')?.value,
      description: this.taskForm.get('description')?.value,
      status: this.taskForm.get('status')?.value
    }
    if(taskButton === ADD_TASK){
      this.taskService
      .createTask(newTask)
      .pipe(
        takeUntil(this._destroy$),
        tap(_=>this.getTask()),
      )
      .subscribe()
    }else{
      const id = this.newUpdateTask.id as string
      const status = newTask.status as string
       this.taskService
         .updateTask(id, status)
         .pipe(
          takeUntil(this._destroy$),
          tap(_=>this.getTask()),
        
          catchError((data)=>{
           console.log(data)
            return data
          })
         )
         .subscribe()
    }
    this.showTasks.next(true)
    this.taskForm.get('title')?.enable()
    this.taskForm.get('description')?.enable()
    this.taskForm.reset()
   
  }

  editTask(event:string){
   
    this.newUpdateTask = this.TaskList.filter((data)=>data.id === event)[0];
    const updatedTask = {
      title:this.newUpdateTask.title,
      description:this.newUpdateTask.description,
      status:this.newUpdateTask.status
    }
    this.taskForm.setValue(updatedTask)
    this.taskForm.get('title')?.disable()
    this.taskForm.get('description')?.disable()
    this.showTasks.next(false)
    this.taskButton = UPDATE_TASK
    
  }

  deleteTask(event:string){
    this.taskService
    .deleteTask(event)
    .pipe(
      takeUntil(this._destroy$),
      tap(_=> this.getTask()),
      catchError((data)=>{
       console.log(data)
        return data
      })
     )
    .subscribe()
  }

  logOut(){
    this.router.navigate(['login'])
    localStorage.removeItem('loginToken');
    
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
