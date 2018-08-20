import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OAuthGuard } from '../../oauth/oauth-guard.service';

import { MailListComponent }   from './mail-list/mail-list.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';
import { MailComponent } from './mail.component';

const mailRoutes: Routes = [
  { path: '', component: MailComponent, canActivate: [OAuthGuard], children: [
    { path: '', component: MailListComponent },
    { path: 'new', component: MailListComponent },
    { path: ':account/:id', component: MailDetailComponent },
    { path: ':account/:id/edit', component: MailDetailComponent },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(mailRoutes)
  ],
  exports: [RouterModule],
  providers: [
    OAuthGuard
  ]
})
export class MailRoutingModule {}
