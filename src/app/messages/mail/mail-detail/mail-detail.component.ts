import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MailService } from '../mail.service';
import { Mail } from '../mail.model';

@Component({
  selector: 'app-mail-detail',
  templateUrl: './mail-detail.component.html',
  styleUrls: ['./mail-detail.component.css']
})
export class MailDetailComponent implements OnInit {
  private account: string;
  private id:number;

  message: Mail = {'id':0, subject: '', msg_from: '', msg_to:'', date: '', flags: '', user: '', body:''};
  subscription: Subscription;

  constructor(
    private mailService: MailService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('Load Mail');
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.account = params['account'];
          this.mailService.getMail(this.account, this.id);

          this.subscription = this.mailService.mailChose.subscribe(
            (message:Mail) => {
              this.message = message;
            }
          )
        }
      );
  }

}
