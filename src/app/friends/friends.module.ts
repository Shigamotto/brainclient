import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FriendsComponent } from './friends.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { FriendItemComponent } from './friend-list/friend-item/friend-item.component';
import { FriendDetailComponent } from './friend-detail/friend-detail.component';

import { FriendsService } from './friends.service';

// import { HeaderBKComponent } from './header-bookkeeping/header.bk.component';

import { SharedModule } from '../shared/shared.module';
import { FriendsRoutingModule } from './friends-routing.module';

@NgModule({
  declarations: [
    FriendsComponent,
    FriendListComponent,
    FriendItemComponent,
    FriendDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FriendsRoutingModule,
    SharedModule
  ],
  providers: [
    // WarehouseService,
  ]
})
export class FriendsModule {}
