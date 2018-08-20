import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MailService } from '../mail.service';
import { Mail } from '../mail.model';

@Component({
  selector: 'app-mail-list',
  templateUrl: 'mail-list.component.html',
  styleUrls: ['mail-list.component.css']
})
export class MailListComponent implements OnInit {
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
