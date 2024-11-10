import { Injectable } from '@angular/core';
import { Task } from '../modals/tasks';

@Injectable({
  providedIn: 'root'
})
export class CookieServiceService {

  taskListString: string = 'taskList'
  emptyTaskList!: Task[]

  constructor() { }

  saveTaskList(taskList: Task[]) {
    localStorage.setItem(this.taskListString, JSON.stringify(taskList))
  }

  getTaskList() {
    const value = localStorage.getItem(this.taskListString)
    return value ? JSON.parse(value) : this.emptyTaskList
  }

}
