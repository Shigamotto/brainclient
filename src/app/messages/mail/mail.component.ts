import { Component, OnInit } from '@angular/core';

import { Mail } from './mail.model';

@Component({
  selector: 'app-mail',
  templateUrl: 'mail.component.html',
  styleUrls: ['mail.component.css']
})
export class MailComponent implements OnInit {
  messages:Mail[];

  constructor() {}

  ngOnInit() {}

}
