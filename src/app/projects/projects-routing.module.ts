import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OAuthGuard } from '../oauth/oauth-guard.service';

import { ProjectsComponent }   from './projects.component';
import { ProjectListComponent }   from './project-list/project-list.component';
import { ProjectLeadsComponent }   from './project-leads/project-leads.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

import { SchedulerComponent }   from './scheduler/scheduler.component';
import { GanttComponent } from './gantt/gant.component';

import { KanbanComponent }   from './kanban/kanban.component';

const projectsRoutes: Routes = [
  { path: '', component: ProjectsComponent, children: [
    { path: '', redirectTo: 'leads' },
    { path: 'list', component: ProjectListComponent },
    { path: 'calendar', component: SchedulerComponent },
    { path: 'kanban', component: KanbanComponent },
    { path: 'scheduler', redirectTo: 'calendar', },
    { path: 'gantt', component: GanttComponent },
    { path: 'leads', component: ProjectLeadsComponent },
    { path: 'new', component: ProjectListComponent },
    { path: ':id', component: ProjectDetailComponent },
    { path: ':id/edit', component: ProjectDetailComponent },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes)
  ],
  exports: [RouterModule],
  providers: [
    OAuthGuard
  ]
})
export class ProjectsRoutingModule {}
