import {Component, OnInit, OnDestroy} from "@angular/core";
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { ProjectsService } from "../../../../projects/projects.service";
import { Task } from "../../../../projects/projects.model";

@Component({
    selector: "app-widget-agenda",
    styleUrls: ['widget-agenda.component.css'],
    templateUrl: 'widget-agenda.component.html',
})

export class WidgetAgendaComponent implements OnInit {
  subscription: Subscription;
  tasks:{}[];

  constructor(
    private projectService: ProjectsService,
  ) { }

  ngOnInit() {
    this.projectService.getTasks();
    this.subscription = this.projectService.taskChanged
      .pipe(
        map( (tasks: Task[]) =>{
          return tasks.map((task:any) => {
            let start_date = moment(task["date"]["start"]).format('YYYY-MM-DD');
            let start_hours = moment(task["date"]["start"]).format('HH:mm');
            return {
              id: task.id,
              title: task.title,
              status: task.status,
              date: start_date,
              hours: start_hours
            }
          });
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.tasks = data;
        }
      );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
