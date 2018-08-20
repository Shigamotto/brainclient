import {Component,
  OnInit, OnDestroy,
  ElementRef, ViewChild, ViewEncapsulation } from "@angular/core";
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';


import {Event} from "../../../../projects/scheduler/event";
import {ProjectsService} from "../../../../projects/projects.service";
import {Task} from "../../../../projects/projects.model";

import * as moment from 'moment';
import "dhtmlx-scheduler";
// import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_agenda_view";
import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_minical";
import {} from "@types/dhtmlxscheduler";


@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "app-widget-scheduler",
    styleUrls: ['widget-scheduler.component.css'],
    templateUrl: 'widget-scheduler.component.html',
})

export class WidgetSchedulerComponent implements OnInit {
  subscription: Subscription;
  events:Event[];

  @ViewChild("scheduler_widget_here") schedulerContainer: ElementRef;

  constructor(
    private projectService: ProjectsService,
  ) { }

  ngOnInit() {
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";

    scheduler.init(this.schedulerContainer.nativeElement, new Date(),'month');
    scheduler.config.multi_day = true;

    this.projectService.getTasks();
    this.subscription = this.projectService.taskChanged
      .pipe(
        map( (tasks: Task[]) =>{
          return tasks.map((task:any) => {
            let start_date = moment(task["date"]["start"]).format('YYYY-MM-DD HH:mm');
            let end_date = moment(task["date"]["end"]).format('YYYY-MM-DD HH:mm');
            return new Event(task['pk'], start_date, end_date, task['title']);
          });
        })
      )
      .subscribe(
        (data) => {
          this.events = data;
          scheduler.parse(this.events, "json");
          console.log(data);
        }
      );

    scheduler.attachEvent("onEventAdded", (id, ev) => {
      this.projectService.makeTask(ev.text, ev.start_date, ev.end_date);
    });

    scheduler.attachEvent("onEventChanged", (id, ev) => {
      this.projectService.editTask(ev.id, ev.text, ev.start_date, ev.end_date)
    });

    scheduler.attachEvent("onEventDeleted", (id) => {
      this.projectService.deleteTask(id);
    });

  }

  show_minical(){
    if (scheduler.isCalendarVisible()){
        scheduler.destroyCalendar();
    } else {
        scheduler.renderCalendar({
            position:"dhx_minical_icon",
            date:scheduler.date,
            navigation:true,
            handler:function(date,calendar){
                scheduler.setCurrentView(date);
                scheduler.destroyCalendar()
            }
        });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
