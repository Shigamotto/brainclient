import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { MailRoutingModule } from './mail-routing.module';

import { MailComponent } from './mail.component';
import { MailMenuComponent } from './mail-menu/mail-menu.component';
import { MailListComponent } from './mail-list/mail-list.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';
import { MailListItemComponent } from './mail-list/mail-list-item/mail-list-item.component';

@NgModule({
  declarations: [
    MailComponent,
    MailMenuComponent,
    MailDetailComponent,
    MailListComponent,
    MailListItemComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MailRoutingModule,
    SharedModule
  ]
})
export class MailModule {}
