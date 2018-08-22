import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import * as moment from 'moment';

import { WebsocketService } from '../../core/websocket';
import { Message, Dialog } from '../messages.model';
import { OAuthService } from '../../oauth/oauth.service';

@Injectable()
export class MessageBrainService {
  private dialogList: Dialog[] = [];
  public dialog: Dialog;

  dialogChanged = new Subject<Dialog[]>();
  dialogChose = new Subject<Dialog>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: OAuthService,
    private wsService: WebsocketService,
  ) {}

  setDialog(dialog: Dialog) {
    this.dialog = dialog;
    this.dialogChose.next(this.dialog);
  }
  setDialogs(dialogs: Dialog[]) {
    this.dialogList = dialogs;
    this.dialogChanged.next(this.dialogList.slice());
  }

  getDialogList() {
    this.http.get<Dialog[]>('http://127.0.0.1:8000/api/dialogs/?format=json')
      .pipe(
        map((dialogs: Dialog[]) => {
          return dialogs.map( (dialog: any) => {
            const oldDate = moment(dialog.update);
            let newDate: string;
            if ( oldDate.isAfter(new Date(), 'day') ) {
              newDate = oldDate.format('DD MMM');
            } else if ( oldDate.isAfter(new Date(), 'year') ) {
              newDate = oldDate.format('HH:mm');
            } else {
              newDate = oldDate.format('DD MMM YY');
            }
            return new Dialog(
              dialog.id,
              newDate,
              dialog.users,
              dialog.messages,
              dialog.unseen,
              );
          });
        })
      )
      .subscribe(
        (dialogs: Dialog[]) => { this.setDialogs(dialogs); }
      );
  }

  getDialog(id: number) {
    this.http.get<Dialog>('http://127.0.0.1:8000/api/dialogs/' + id + '/?format=json')
      .pipe(
        map(
          (dialog: Dialog) => {
            const newUsers = [];
            dialog.users.map( user => {
              if (user.username !== this.authService.user) {
                newUsers.push(user);
              }
            });
            const messages = dialog['messages'].map( (message: any) => {
              const id = message.id ? message.id : message.pk;
              // const date = moment(message.date).format('HH:mm / DD MMM YY');
              const body = message.body ? message.body : message.message;
              return new Message(
                id,
                message.date,
                body,
                message.from,
                message.to,
                message.subject,
                message.flags,
                message.unseen,
              );
            } );
            return new Dialog(
              dialog.id,
              dialog.update,
              newUsers,
              messages,
              dialog.unseen,
            );
          })
      )
      .subscribe(
        (dialog: Dialog) => { this.setDialog(dialog); }
      );
  }

  sendMessage(id: number, message: string) {
    this.wsService.send(
      'message',
      id,
      {
        'message': message, // %Y-%m-%dT%H:%M:%S.%fZ
        'date': moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')
      }
    );
    // this.http.post('http://127.0.0.1:8000/api/message/dialog/' + id + '/',
    //   {messages: {message: message} } )
    //   .subscribe(
    //     res => { console.log(res); },
    //     err => { console.log(err); }
    //   );
  }

}
