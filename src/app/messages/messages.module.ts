import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MessagesRoutingModule } from './messages-routing.module';

import { MessagesComponent } from './messages.component';

@NgModule({
  declarations: [
    MessagesComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MessagesRoutingModule,
    SharedModule
  ]
})
export class MessagesModule {}
