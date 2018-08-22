import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { HeaderService } from '../../core/header/header.service';
import { ProjectsService } from '../projects.service';
import { Task } from '../projects.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  private id: number;

  task: Task = Task.EMPTY_MODEL;
  subscription: Subscription;
  whomIsOpen = false;

  constructor(
    private headService: HeaderService,
    private projectsService: ProjectsService,
    private route: ActivatedRoute
  ) { }

  openWhom() {
    console.log('need to open whom');
    this.whomIsOpen = !this.whomIsOpen;
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.projectsService.getTask(this.id);
          this.subscription = this.projectsService.taskChose.pipe(
            map((task: Task) => {
              task['id'] = task['id']? task["id"]: task["pk"];
              task["date"]["pub"] = moment(task["date"]["pub"]).format('YYYY MMM DD HH:mm');
              task["date"]["start"] = moment(task["date"]["start"]).format('YYYY MMM DD HH:mm');
              if (task["date"]["end"] > task["date"]["dead"]) {
                task["over"] = true
              }
              task["date"]["end"] = moment(task["date"]["end"]).format('YYYY MMM DD HH:mm');
              task["date"]["dead"] = moment(task["date"]["dead"]).format('YYYY MMM DD HH:mm');
              return task
            }))
            .subscribe(
            (task:Task) => {
              let status = task.status == 0? 'draft':
                  task.status == 1?'wait-to-work':
                  task.status == 2?'in-work':
                  task.status == 3?'wait-to-confirm':
                  task.status == 4?'rework':
                  task.status == 5?'confirm':0;
              this.task = task;
              this.headService.setStatus( 'task ' + status );
              this.headService.setWidget(
                task.budget == null? '0': task.budget.toString()
              );
            }
          )
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.headService.setStatus( undefined );
    this.headService.setWidget( undefined );
  }
}
