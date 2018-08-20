import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WebsocketService } from '../../../../core/websocket';

import { OAuthService } from '../../../../oauth/oauth.service';
import { MessageBrainService } from '../../messages-brain.service';
import { Message } from '../../../messages.model';


@Component({
  selector: 'message-input',
  templateUrl: 'mpb-message-input.component.html',
  styleUrls: ['mpb-message-input.component.css']
})
export class MBPMessageInputComponent implements OnInit {
  @Input() id: number;
  MBPForm: FormGroup;
  message: Message = Message.EMPTY_MODEL;

  constructor(
    private autService: OAuthService,
    private mbpService: MessageBrainService,
    private route: ActivatedRoute,
    private wsService: WebsocketService,
    private router: Router
  ) { }

  initForm() {
    this.MBPForm = new FormGroup({
      'message': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.initForm();
  }

  OnDestroy() {}

  onSubmit() {
    this.mbpService.sendMessage(this.id, this.MBPForm.value.message);
  }

}
