import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { HeaderService } from '../../core/header/header.service';
import { FriendsService } from '../friends.service';
import { Friend } from '../friend.model';

@Component({
  selector: 'app-friend-detail',
  templateUrl: './friend-detail.component.html',
  styleUrls: ['./friend-detail.component.css']
})
export class FriendDetailComponent implements OnInit {
  private id: number;

  friend: Friend = Friend.EMPTY_MODEL;
  subscription: Subscription;

  constructor(
    private headService: HeaderService,
    private whService: FriendsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.whService.getWarehouse(this.id);
          this.subscription = this.whService.WHChose.subscribe(
            (data: Friend) => {
              this.friend = data;
            }
          );
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
