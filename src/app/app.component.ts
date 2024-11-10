import { Component, OnInit } from '@angular/core';
import { Task } from './modals/tasks';
import { CookieServiceService } from './services/cookie-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'task-app';

  constructor(private _cookieService: CookieServiceService) { }

  ngOnInit(): void {
    // const taskList = [{
    //   taskId: 1,
    //   taskName: 'Pending Task',
    //   taskDescription: 'This is some task to be completed on so and date and some big task has to be completed in a certain way which is supposed to have a proper plan but there is none because, you know life',
    //   isTaskCompleted: false,
    //   taskCompletionDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 99),
    // },
    // {
    //   taskId: 2,
    //   taskName: 'Completed Task',
    //   taskDescription: 'This is some task to be completed on so and date and some big task has to be completed in a certain way which is supposed to have a proper plan but there is none because, you know life',
    //   isTaskCompleted: true,
    //   taskCompletionDate: new Date(2024, 5, 16),
    // },
    // {
    //   taskId: 3,
    //   taskName: 'Missed Task',
    //   taskDescription: 'This is some task to be completed on so and date and some big task has to be completed in a certain way which is supposed to have a proper plan but there is none because, you know life',
    //   isTaskCompleted: false,
    //   taskCompletionDate: new Date(2024, 5, 10),
    // }]
    // this._cookieService.saveTaskList(taskList)
  }
}