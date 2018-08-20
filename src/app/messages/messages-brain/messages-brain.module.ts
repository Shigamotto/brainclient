import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { MessagesBrainRoutingModule } from './messages-brain-routing.module';

import { MessagesBrainComponent } from './messages-brain.component';
import { MessagesBrainMenuComponent } from './messages-brain-menu/messages-brain-menu.component';
import { MessagesBrainDialogListComponent } from './messages-brain-dialog-list/messages-brain-dialog-list.component';
import { MBPDialogListItemComponent } from './messages-brain-dialog-list/mpb-dialog-list-item/mpb-dialog-list-item.component';
import { MBPMessageInputComponent } from './messages-brain-dialog/message-input/mbp-message-input.component';
import { MessagesBrainDialogComponent } from './messages-brain-dialog/messages-brain-dialog.component';
import { MessageItemComponent } from './messages-brain-dialog/message-item/mbp-message-item.component';

@NgModule({
  declarations: [
    MessagesBrainComponent,
    MessagesBrainMenuComponent,
    MessagesBrainDialogComponent,
    MessagesBrainDialogListComponent,
    MBPDialogListItemComponent,
    MBPMessageInputComponent,
    MessageItemComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MessagesBrainRoutingModule,
    SharedModule
  ]
})
export class MessagesBrainModule {}
