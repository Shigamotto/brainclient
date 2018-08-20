import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';

import { SettingsComponent } from './settings.component';
import { SettingsProfileComponent } from './profile/settings-profile.component';
import { SettingsLtdComponent } from './ltd/settings-ltd.component';
// import {EventService} from './gantt/event.service';
// import {LinkService} from './gantt/link.service';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsProfileComponent,
    SettingsLtdComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    SharedModule
  ],
  providers: [
    // LinkService,
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    // {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ]
})
export class SettingsModule {}
