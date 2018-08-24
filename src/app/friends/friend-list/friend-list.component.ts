import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { FriendsService } from '../friends.service';
import { Friend } from '../friend.model';
import { SettingsService } from '../../settings/settings.service';
import { Profile } from '../../settings/settings.model';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  subscription: Subscription;
  profile = Profile.EMPTY_MODEL;
  friends: Friend[];

  constructor(
    private settingsService: SettingsService,
    private friendsService: FriendsService,
  ) { }

  ngOnInit() {
    this.subscription = this.settingsService.profileChanged
      .subscribe(
        (profile: Profile) => {
          this.friends = profile.friends;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
