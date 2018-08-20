import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OAuthGuard } from '../oauth/oauth-guard.service';
import { MessagesComponent } from './messages.component';

const messagesRoutes: Routes = [
  { path: '', component: MessagesComponent, canActivate: [OAuthGuard],
      children: [
        { path: '', redirectTo:'mail', pathMatch: 'full' },
        { path: 'mail', loadChildren: './mail/mail.module#MailModule' },
        { path: 'bp', loadChildren: './messages-brain/messages-brain.module#MessagesBrainModule' },
      // { path: 'telegram', component: MailListComponent },
      // { path: 'viber', component: MailDetailComponent },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(messagesRoutes)
  ],
  exports: [RouterModule],
  providers: [
    OAuthGuard
  ]
})
export class MessagesRoutingModule {}
