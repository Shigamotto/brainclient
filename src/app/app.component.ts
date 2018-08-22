import { Component, OnInit } from '@angular/core';

import { OAuthService } from './oauth/oauth.service';
import { SettingsService } from './settings/settings.service';
import { HeaderService } from './core/header/header.service';
import { Profile } from './settings/settings.model';
import { WebsocketService } from './core/websocket';
import {WS} from './core/websocket/websocket.events';
import {IMessage} from './messages/messages-brain/messages-brain-dialog/messages-brain-dialog.component';
import {Observable, Subscription} from 'rxjs';
import {NotificationsService} from './core/notifications/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // private notification$: Observable<IMessage[]>;
  private notification$: Subscription;
  public menuOpened = true;
  user: Profile = Profile.EMPTY_MODEL;

  constructor(
    private settingsService: SettingsService,
    private authService: OAuthService,
    private headerService: HeaderService,
    private wsService: WebsocketService,
    public notificationService: NotificationsService
  ) {}

  ngOnInit() {
    this.authService.getUser();
    this.settingsService.profileChanged
      .subscribe(
        (profile) => {
          this.user = profile;
        }
      );
    this.notification$ = this.wsService.on<IMessage[]>(WS.ON.NOTIFICATION)
      .subscribe((msg: any) => {
        console.log(msg);
        this.notificationService.addNotification(msg);
      });
  }

  /*menuOpen(opened:boolean){
    this.menuOpened = this.menuOpened ? false : true;
  }*/


}
