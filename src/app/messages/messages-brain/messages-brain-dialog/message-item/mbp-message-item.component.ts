import { Component, OnInit, Input } from '@angular/core';

import { Message } from '../../../messages.model';

@Component({
  selector: 'message-item',
  templateUrl: 'mpb-message-item.component.html',
  styleUrls: ['mpb-message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message = Message.EMPTY_MODEL;
  @Input() index: number;

  constructor() { }

  ngOnInit() { }

}
