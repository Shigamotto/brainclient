import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';

import { OAuthService } from '../../../oauth/oauth.service';
import { MessageBrainService } from '../messages-brain.service';
import { Message, Dialog } from '../../messages.model';

// import { MessagesBrainWSService } from '../messages-brain.ws.services';
// import { WebsocketService } from '../../../core/websocket.service';
import { WebsocketService } from '../../../core/websocket';
import { WS } from '../../../core/websocket/websocket.events';

export interface IMessage {
  id: number;
  date: string;
  body: string;
  from: string;
}

@Component({
  selector: 'app-messages-brain-dialog',
  templateUrl: './messages-brain-dialog.component.html',
  styleUrls: ['./messages-brain-dialog.component.css']
})
export class MessagesBrainDialogComponent implements OnInit {
  private message$: Observable<IMessage[]>;
  private counter$: Observable<number>;
  private texts$: Observable<string[]>;

  private id: number;

  dialog: Dialog = Dialog.EMPTY_MODEL;
  subscription: Subscription;
  wsSubsctiption: Subscription;

  constructor(
    private authService: OAuthService,
    private messageService: MessageBrainService,
    private router: Router,
    private route: ActivatedRoute,
    private wsService: WebsocketService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.messageService.getDialog(this.id);

          this.subscription = this.messageService.dialogChose.subscribe(
            (dialog: Dialog) => {
              this.dialog = dialog;
            }
          );

          // const url = 'ws://127.0.0.1:8000/messages/' + this.id + '/';
          // this.wsService.connect(url).subscribe(msg => {
          //     console.log(msg);
          // });
        }
      );

    this.wsSubsctiption = this.wsService.on<IMessage[]>(WS.ON.MESSAGE).subscribe((msg: any) => {
      console.log(msg);
      this.dialog.messages.push(new Message(msg.id, msg.date, msg.body, msg.from));
    });
    // get messages
    this.message$ = this.wsService.on<IMessage[]>(WS.ON.MESSAGE);

    // get counter
    this.counter$ = this.wsService.on<number>(WS.ON.COUNTER);

    // get texts
    this.texts$ = this.wsService.on<string[]>(WS.ON.UPDATE_TEXTS);

  }

  OnDestroy() {
    this.subscription.unsubscribe();
    this.wsSubsctiption.unsubscribe();
  }

}
