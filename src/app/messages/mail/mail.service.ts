import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import * as moment from 'moment';

import { Mail } from './mail.model';
import { OAuthService } from '../../oauth/oauth.service';

@Injectable()
export class MailService {
  private messages: Mail[] = [];
  public message: Mail;

  mailChanged = new Subject<Mail[]>();
  mailChose = new Subject<Mail>();
  token: string;

  constructor(private router: Router,
              private http: HttpClient,
              private authService: OAuthService) {}

  setMails(messages: Mail[]) {
    this.messages = messages;
    this.mailChanged.next(this.messages.slice());
  }

  setMail(message: Mail) {
    this.message = message;
    this.mailChose.next(this.message);
  }

  getMails() {
    this.http.get<Mail[]>('http://127.0.0.1:8000/api/mails/?format=json')
      .pipe(
        map((mails: Mail[]) => {
          console.log(mails);
          return mails[0]['messages'].map( (mail: any) => {
            const oldDate = moment(mail.date);
            let newDate: string;
            if ( oldDate.isAfter(new Date(), 'day') ) { newDate = oldDate.format('DD MMM');
            } else if ( oldDate.isAfter(new Date(), 'year') ) {
              newDate = oldDate.format('HH:mm');
            } else {
              newDate = oldDate.format('DD MMM YY');
            }
            return new Mail(mail.id, mail.subject, mail.msg_from, mail.msg_to, newDate, mail.flags, mail.user);
          });
        })
      )
      .subscribe(
        (messages: Mail[]) => { this.setMails(messages); }
      );
  }

  getMail(account: string, id: number) {
    this.http.get<Mail>('http://127.0.0.1:8000/api/mails/' + account + '/' + id + '/?format=json')
      .pipe(
        map(
          (mail: Mail) => {
            console.log(mail);
            return mail['message'];
          })
      )
      .subscribe(
        (message: Mail) => { this.setMail(message); } // this.message = message
      );
  }

}
