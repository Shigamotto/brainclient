import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { ProjectsRoutingModule } from './projects-routing.module';
// import { AuthInterceptor } from '../shared/auth.interceptor';

import { ProjectsComponent } from './projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectLeadsComponent } from './project-leads/project-leads.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
// import {EventService} from './gantt/event.service';
// import {LinkService} from './gantt/link.service';
import {GanttComponent} from './gantt/gant.component';
import {SchedulerComponent} from './scheduler/scheduler.component';
import { KanbanComponent }   from './kanban/kanban.component';
import { KanbanCardComponent }   from './kanban/kanban-card/kanban-card.component';
import { KanbanListComponent }   from './kanban/kanban-list/kanban-list.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectListComponent,
    ProjectLeadsComponent,
    ProjectDetailComponent,
    KanbanComponent,
    KanbanCardComponent,
    KanbanListComponent,
    SchedulerComponent,
    GanttComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectsRoutingModule,
    SharedModule
  ],
  providers: [
    // LinkService,
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    // {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ]
})
export class ProjectsModule {}
