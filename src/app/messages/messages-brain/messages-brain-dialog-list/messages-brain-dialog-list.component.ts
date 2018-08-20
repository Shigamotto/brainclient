import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageBrainService } from '../messages-brain.service';
import { Message, Dialog } from '../../messages.model';

@Component({
  selector: 'app-messages-brain-dialog-list',
  templateUrl: 'messages-brain-dialog-list.component.html',
  styleUrls: ['messages-brain-dialog-list.component.css']
})
export class MessagesBrainDialogListComponent implements OnInit {
  dialogs: Dialog[];
  subscription: Subscription;

  constructor(private messageBrainService: MessageBrainService) { }

  ngOnInit() {
    this.messageBrainService.getDialogList();
    this.subscription = this.messageBrainService.dialogChanged
      .subscribe(
        (dialogs: Dialog[]) => {
          this.dialogs = dialogs;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
