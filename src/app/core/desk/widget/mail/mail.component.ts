import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MailService } from '../../../../messages/mail/mail.service';
import { Mail } from '../../../../messages/mail/mail.model';

@Component({
  selector: 'app-widget-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class WidgetMailComponent implements OnInit {
  messages: Mail[];
  subscription: Subscription;

  constructor(private mailService: MailService) { }

  ngOnInit() {
    this.mailService.getMails();
    this.subscription = this.mailService.mailChanged
      .subscribe(
        (messages: Mail[]) => {
          this.messages = messages;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
