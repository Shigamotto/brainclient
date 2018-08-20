import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OAuthGuard } from '../../oauth/oauth-guard.service';

import { MessagesBrainComponent } from './messages-brain.component';
import { MessagesBrainDialogComponent } from './messages-brain-dialog/messages-brain-dialog.component';
// import { MessagesBrainDialogListComponent }   from './messages-brain-dialog-list/messages-brain-dialog-list.component';

const messagesBrainRoutes: Routes = [
  { path: '', component: MessagesBrainComponent, canActivate: [OAuthGuard], children: [
    // { path: '', component: MessagesBrainDialogListComponent },
    // { path: 'new', component: MessagesBrainDialogListComponent },
    { path: ':id', component: MessagesBrainDialogComponent },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(messagesBrainRoutes)
  ],
  exports: [RouterModule],
  providers: [
    OAuthGuard
  ]
})
export class MessagesBrainRoutingModule {}
