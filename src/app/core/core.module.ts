import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { SettingsModule } from '../settings/settings.module';
import { HeaderModule } from './header/header.module';
// import { DeskComponent } from './desk/desk.component'; #
// import { DeskModule } from './desk/desk.module'; #
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';

// import { HomeComponent } from '../home/home.component';
// import { FirstPageComponent } from '../first-page/first-page.component';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SettingsService } from '../settings/settings.service';
import { ClockService } from './header/clock.service';
import { OAuthService } from '../oauth/oauth.service';
import { ProjectsService } from '../projects/projects.service';
import { MailService } from '../messages/mail/mail.service';
import { MessageBrainService } from '../messages/messages-brain/messages-brain.service';
// import { MessagesBrainWSService } from '../messages/messages-brain/messages-brain.ws.services';
// import { WebsocketService } from './websocket.service';


// import { MomentModule } from 'angular2-moment';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle'; #
import { OAuthInterceptor } from '../shared/oauth.interceptor';
import {WebsocketModule} from './websocket';
import {NotificationsService} from './notifications/notifications.service';
import {NotificationsComponent} from './notifications/notifications.component';

@NgModule({
  declarations: [
    // FirstPageComponent,
    // HomeComponent,
    MenuComponent,
    SearchComponent,
    NotificationsComponent
  ],
  imports: [
    // MDBBootstrapModule.forRoot(),
    // DeskModule, #
    // MatSlideToggleModule, #
    FormsModule,
    SharedModule,
    // MomentModule, #
    HeaderModule,
    SettingsModule,
    AppRoutingModule,
    WebsocketModule.config({
      url: 'ws://127.0.0.1:8000/ws/'
    })
  ],
  exports: [
    // MDBBootstrapModule,
    AppRoutingModule,
    MenuComponent,
    NotificationsComponent,
    HeaderModule
  ],
  providers: [
    SettingsService,
    ClockService,
    OAuthService,
    ProjectsService,
    MailService,
    MessageBrainService,
    NotificationsService,
    // WebsocketService,
    {provide: HTTP_INTERCEPTORS, useClass: OAuthInterceptor, multi: true}
    // {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ]
})
export class CoreModule {}
