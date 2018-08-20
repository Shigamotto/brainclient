import { Component, OnInit, Input } from '@angular/core';

import { Mail } from '../../mail.model';

@Component({
  selector: 'app-mail-list-item',
  templateUrl: 'mail-list-item.component.html',
  styleUrls: ['mail-list-item.component.css']
})
export class MailListItemComponent implements OnInit {
  @Input() mail: Mail;
  @Input() index: number;

  constructor() { }

  ngOnInit() { }

}
