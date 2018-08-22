import { Component, OnInit, OnDestroy } from '@angular/core';

import {Notification, NotificationsService} from './notifications.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.component.html',
  styleUrls: ['notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  subscription: Subscription;
  notifications: Notification[];

  constructor(private noteService: NotificationsService) {}

  ngOnInit() {
    this.subscription = this.noteService.notificationsChanged
      .subscribe((note: Notification[]) => {
        this.notifications = note;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close(id: number) {
    this.noteService.removeNotification(id);
  }

}
