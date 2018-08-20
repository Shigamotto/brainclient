import {Component,
  OnInit, OnDestroy,
  ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import {Event} from './event';
import {ProjectsService} from '../projects.service';
import {Task} from '../projects.model';

import * as moment from 'moment';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_year_view';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_agenda_view';
import {} from '@types/dhtmlxscheduler';


@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'scheduler',
    styleUrls: ['scheduler.component.css'],
    templateUrl: 'scheduler.component.html',
})

export class SchedulerComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  events: Event[];
  addEvent: any;  deleteEvent: any; changeEvent: any;

  @ViewChild('scheduler_here') schedulerContainer: ElementRef;

  constructor(
    private projectService: ProjectsService,
  ) { }

  ngOnInit() {
    scheduler.config.xml_date = '%Y-%m-%d %H:%i';
    scheduler.xy.nav_height = 40;
    scheduler.xy.margin_left = 0;

    scheduler.init(this.schedulerContainer.nativeElement, new Date(), 'month');
    scheduler.config.multi_day = true;

    this.projectService.getTasks();
    this.subscription = this.projectService.taskChanged.pipe(
      map( (tasks: Task[]) => {
        return tasks.map((task: any) => {
          const start_date = moment(task['date']['start']).format('YYYY-MM-DD HH:mm');
          const end_date = moment(task['date']['end']).format('YYYY-MM-DD HH:mm');
          return new Event(task['id'], start_date, end_date, task['title']);
        });
      }))
      .subscribe(
        (data) => {
          this.events = data;
          scheduler.parse(this.events, 'json');
        }
      );

    this.addEvent = scheduler.attachEvent('onEventAdded', (id, ev) => {
      this.projectService.makeTask(ev.text, ev.start_date, ev.end_date);
    });

    this.changeEvent = scheduler.attachEvent('onEventChanged', (id, ev) => {
      this.projectService.editTask(ev.id, ev.text, ev.start_date, ev.end_date);
    });

    this.deleteEvent = scheduler.attachEvent('onEventDeleted', (id) => {
      this.projectService.deleteTask(id);
    });

  }

  ngOnDestroy() {
    scheduler.clearAll();
    scheduler.detachEvent(this.addEvent);
    scheduler.detachEvent(this.changeEvent);
    scheduler.detachEvent(this.deleteEvent);
    this.subscription.unsubscribe();
  }

}
