import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Task } from 'src/app/modals/tasks';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  isTask: boolean = false
  task: Task | undefined
  currentDate = new Date()
  datePicketStartDate = new Date(1990, 0, 1)
  color: ThemePalette = 'primary';

  taskName: string = ''
  taskDescription: string = ''
  taskCompletionDate: Date = this.currentDate

  constructor(private _taskService: TaskServiceService, private _cookieService: CookieServiceService, private _router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    const tempTask = this._taskService.getTask()
    if (tempTask) {
      this.isTask = true
      this.task = tempTask
    }
  }

  // Update Task
  updateTask(updatedTask: Task) {

    const taskList: Task[] = this._cookieService.getTaskList()

    const existingTaskIndex = taskList.findIndex((task: Task) => task.taskId === updatedTask.taskId)
    const existingTask = taskList[existingTaskIndex]
    const existingTaskCompletionDate: Date = new Date(existingTask.taskCompletionDate)
    
    // update date to end of the day
    const newTaskCompletionDate: Date = new Date(updatedTask.taskCompletionDate.getFullYear(), updatedTask.taskCompletionDate.getMonth(), updatedTask.taskCompletionDate.getDate(), 23, 59, 59)
    updatedTask.taskCompletionDate = newTaskCompletionDate

    taskList[existingTaskIndex] = updatedTask
    this._cookieService.saveTaskList(taskList)
    this.openSnackBar('Task has been updated successfully!')
    this._router.navigateByUrl('')
  }

  // create a new task
  createTask(taskName: string, taskDescription: string, taskCompletionDate: Date) {

    const taskList: Task[] = this._cookieService.getTaskList()

    const timestamp = Date.now()
    const randomNum = Math.floor(Math.random() * 1000)
    const uniqueId = `${timestamp}${randomNum}`

    const createdTask: Task = {
      taskId: Number(uniqueId),
      taskName: taskName,
      taskDescription: taskDescription,
      taskCompletionDate: new Date(taskCompletionDate.getFullYear(), taskCompletionDate.getMonth(), taskCompletionDate.getDate(), 23, 59, 59),
      isTaskCompleted: false
    }

    taskList.push(createdTask)
    this._cookieService.saveTaskList(taskList)
    this.openSnackBar('Task has been created successfully!')
    this._router.navigateByUrl('')

  }

  openSnackBar(snackBarText: string) {
    this._snackBar.open(snackBarText, 'Okay', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000
    });
  }
}