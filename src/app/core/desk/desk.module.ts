import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { Routes, RouterModule } from '@angular/router';

import { DeskComponent } from './desk.component';
import { WidgetBudgetComponent } from './widget/budget/budget.component';
import { WidgetNewsComponent } from './widget/news/news.component';
import { WidgetMailComponent } from './widget/mail/mail.component';
import { WidgetAgendaComponent } from './widget/agenda/agenda.component';
// import { WidgetSchedulerComponent } from './widget/scheduler/scheduler.component';

@NgModule({
  declarations: [
    DeskComponent,
    WidgetBudgetComponent,
    WidgetNewsComponent,
    WidgetMailComponent,
    WidgetAgendaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MomentModule,
  ],
  providers: [
  ]
})
export class DeskModule {}
