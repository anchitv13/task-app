import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from '../../modals/tasks'
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  taskList: Task[] = []
  currentDate = new Date()
  datePicketStartDate = new Date(1990, 0, 1, 0, 0, 0, 0)
  datePicketCurrentDate = new Date(1990, 0, 1, 0, 0, 0, 0)
  color: ThemePalette = 'primary';
  checked = false;

  constructor(private _router: Router, private _taskService: TaskServiceService, private _cookieService: CookieServiceService, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {

    this.datePicketStartDate.setDate(this.currentDate.getDate() - 7)
    this.datePicketCurrentDate = this.currentDate
    this.taskList = this._cookieService.getTaskList()

    // Update Flags in list
    this.taskList = this.updateTaskFlags(this.taskList)

    // sort tasks in list
    this.taskList = this.sortTasks(this.taskList)
  }

  sortTasks(unsortedTasks: Task[]) {
    // First, we filter and sort the tasks in each category (missed, pending, completed)

    // Missed tasks: Sort by taskCompletionDate (oldest to newest)
    const missedTasks = unsortedTasks.filter(task => task.isMissedTask === 'Y')
      .sort((a, b) => new Date(a.taskCompletionDate).getTime() - new Date(b.taskCompletionDate).getTime());

    // Pending tasks: Sort by taskCompletionDate (newest to oldest)
    const pendingTasks = unsortedTasks.filter(task => task.isPendingTask === 'Y')
      .sort((a, b) => new Date(b.taskCompletionDate).getTime() - new Date(a.taskCompletionDate).getTime());

    // Completed tasks: Sort by taskCompletionDate (newest to oldest)
    const completedTasks = unsortedTasks.filter(task => task.isCompletedTask === 'Y')
      .sort((a, b) => new Date(b.taskCompletionDate).getTime() - new Date(a.taskCompletionDate).getTime());

    // Combine the tasks in the desired order: Missed first, then Pending, then Completed
    return [...missedTasks, ...pendingTasks, ...completedTasks];
  }

  // To send task to other screen
  sendData(taskToSend: Task) {
    this._taskService.sendData(taskToSend)
    this._router.navigateByUrl("task")
  }

  // delete a task from the screen
  deleteTask(taskId: number) {
    this.taskList = this.taskList.filter((taskToRemove) => taskId !== taskToRemove.taskId)
    this._cookieService.saveTaskList(this.taskList)
    this.openSnackBar('Task has been removed successfully!')
  }

  // Update Task on Completion or Target Date Change
  updateTask(updatedTask: Task) {

    const existingTaskIndex = this.taskList.findIndex(task => task.taskId === updatedTask.taskId)
    const existingTask = this.taskList[existingTaskIndex]
    const oldUpdatedTaskCompletedFlag = updatedTask.isCompletedTask

    updatedTask.isTaskCompleted = !existingTask.isTaskCompleted

    this.taskList[existingTaskIndex] = updatedTask

    // Updating the flags to check if the task if marked as completed or not o update dates
    this.taskList = this.updateTaskFlags(this.taskList)
    const newTask = this.taskList[existingTaskIndex]
    const newTaskCompletedFlag = newTask.isCompletedTask
    if (newTaskCompletedFlag === 'Y' && newTaskCompletedFlag != oldUpdatedTaskCompletedFlag) {
      newTask.taskCompletionDate = new Date()
    }

    // re-updating the list of tasks with updated target date, if completed
    this.taskList[existingTaskIndex] = updatedTask

    this._cookieService.saveTaskList(this.taskList)
    this.openSnackBar('Task details updated successfully!')
    this.ngOnInit()
  }

  // Updating Flags for List of Tasks  
  updateTaskFlags(listOfTasks: Task[]) {
    for (let index = 0; index < listOfTasks.length; index++) {
      const task = listOfTasks[index];
      const taskCompletionDate = new Date(task.taskCompletionDate)
      task.isMissedTask = (taskCompletionDate < this.currentDate && !task.isTaskCompleted) ? 'Y' : 'N';
      task.isPendingTask = (!task.isTaskCompleted && taskCompletionDate >= this.currentDate) ? 'Y' : 'N';
      task.isCompletedTask = task.isTaskCompleted ? 'Y' : 'N';
    }
    return listOfTasks
  }

  openSnackBar(snackBarText: string) {
    this._snackBar.open(snackBarText, 'Okay', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000
    });
  }
}
