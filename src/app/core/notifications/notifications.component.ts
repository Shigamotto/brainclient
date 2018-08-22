import { Component, OnInit } from '@angular/core';

import { Message } from '../messages.model';

@Component({
  selector: 'app-messages-brain',
  templateUrl: 'messages-brain.component.html',
  styleUrls: ['messages-brain.component.css']
})
export class MessagesBrainComponent implements OnInit {
  messages: Message[];

  constructor() {}

  ngOnInit() {}

}
