import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../modals/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  task!: Task
  emptyTask!: Task

  sendData(data: any) {
    this.task = data
  }

  private clearData() {
    this.task = this.emptyTask
  }

  getTask() {
    const value = this.task
    this.clearData()
    return value
  }

  constructor() { }
}
