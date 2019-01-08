import { NgModule, Injector } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MatMomentDateModule } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

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
import { FriendsService } from '../friends/friends.service';
// import { MessagesBrainWSService } from '../messages/messages-brain/messages-brain.ws.services';
// import { WebsocketService } from './websocket.service';


// import { MomentModule } from 'angular2-moment';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle'; #
import { OAuthInterceptor } from '../shared/oauth.interceptor';
import {WebsocketModule} from './websocket';
import {NotificationsService} from './notifications/notifications.service';
import {NotificationsComponent} from './notifications/notifications.component';
import {OrganizationService} from '../organization/organization.service';
import {CategoryService} from '../bookkeeping/category/category.service';
import {ItemService} from '../bookkeeping/item/item.service';

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
    MatMomentDateModule,
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
    FriendsService,
    CategoryService,
    OrganizationService,
    ItemService,
    // WebsocketService,
    { provide: HTTP_INTERCEPTORS, useClass: OAuthInterceptor, multi: true},
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    // { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
    // {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ]
})
export class CoreModule {
  // // @Optional() @SkipSelf() - если вдруг мы попытаемся импортировать CoreModule в AppModule и например UserModule - получим ошибку
  // constructor(@Optional() @SkipSelf() parentModule: CoreModule,
  //             userService: OAuthService,
  //             inj: Injector,
  //             auth: AuthService,
  //             http: HttpClient) {
  //
  //   // Получаем интерцепторы которые реализуют интерфейс AuthInterceptor
  //   const interceptors = inj.get<OAuthInterceptor[]>(HTTP_INTERCEPTORS)
  //     .filter(i => i.init );
  //   // передаем http сервис и сервис авторизации.
  //   interceptors.forEach(i => i.init(http, auth));
  //
  //   userService.init();
  //
  //   if (parentModule) {
  //     // если мы здесь, значит случайно включили CoreModule в двух и более местах
  //     throw new Error(
  //       'CoreModule is already loaded. Import it in the AppModule only');
  //   }
  // }
}
