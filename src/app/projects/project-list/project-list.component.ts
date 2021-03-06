import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { ProjectsService } from '../projects.service';
import { Task } from '../projects.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  tasks: Task[];
  subscription: Subscription;

  constructor(private projectService: ProjectsService) { }

  ngOnInit() {
    this.projectService.getTasks();
    this.subscription = this.projectService.taskChanged.pipe(
      map( (tasks: Task[]) => {
        return tasks.map((task: Task) => {
          task['id'] = task['id'] ? task['id'] : task['pk'];
          task['date']['pub'] = moment(task['date']['pub']).format('YYYY MMM DD HH:mm');
          task['date']['start'] = moment(task['date']['start']).format('YYYY MMM DD HH:mm');
          // task['over'] = (task['date']['end'] > task['date']['dead']) && (task['status'] !== 5);
          if (task['date']['end'] > task['date']['dead']) {
            task['over'] = true;
          }
          task['date']['end'] = moment(task['date']['end']).format('YYYY MMM DD HH:mm');
          task['date']['dead'] = moment(task['date']['dead']).format('YYYY MMM DD HH:mm');
          return task;
        });
      }))
      .subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
