import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/tasks';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css',
})
export class TaskManagementComponent implements AfterViewInit{

  @Input('task')
  task$!: Observable<Task[]>;
  
  @Output() taskID = new EventEmitter<string>();
  @Output() deleteTaskID = new EventEmitter<string>();

  @ViewChild('addTaskButton')
  addTaskButton!: ElementRef;

  ngAfterViewInit(): void {
    this.addTaskButton.nativeElement.focus();
  }

  updateTask(id:string | undefined){
    if(typeof id === 'string'){
      this.taskID.emit(id)
    }
  }

  deleteTask(id:string | undefined){
    if(typeof id === 'string'){
      this.deleteTaskID.emit(id)
    }
  }



  

}
