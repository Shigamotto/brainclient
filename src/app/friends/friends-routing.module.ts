import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OAuthGuard } from '../oauth/oauth-guard.service';

import { FriendsComponent } from './friends.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { FriendDetailComponent } from './friend-detail/friend-detail.component';

const warehouseRoutes: Routes = [
  { path: '', component: FriendsComponent, canActivate: [OAuthGuard], children: [
    { path: '', component: FriendListComponent },
    { path: ':id', component: FriendDetailComponent },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(warehouseRoutes)
  ],
  exports: [RouterModule],
  providers: [
    OAuthGuard
  ]
})
export class FriendsRoutingModule {}
