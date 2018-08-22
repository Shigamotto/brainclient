import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { WebsocketService } from '../websocket';
import { OAuthService } from '../../oauth/oauth.service';

export interface Notification {
  id: string;
  body: string;
  link: string;
}

@Injectable()
export class NotificationsService {
  public notifications: Notification[] = [];
  notificationsChanged = new Subject<Notification[]>();

  constructor(
    private authService: OAuthService,
    private wsService: WebsocketService,
  ) {}

  addNotification(note: Notification) {
    this.notifications.push(note);
    this.notificationsChanged.next(this.notifications.slice());
  }

  removeNotification(id: number) {
    this.notifications.splice(id, 1);
    this.notificationsChanged.next(this.notifications.slice());
  }

}
