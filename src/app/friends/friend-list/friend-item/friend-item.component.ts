import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { Friend } from '../../friend.model';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html',
  styleUrls: ['./friend-item.component.css']
})
export class FriendItemComponent implements OnInit {
  @Input() friend: Friend;
  @Input() index: number;
  private clicked = false;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  onClick() {
    if (!this.clicked) {
      this.clicked = true;
    } else {
      // this.router.navigate([{outlets: {booksheet: [this.sheet.id, 'edit']}}]);
      // this.router.navigate([{outlets: {booksheet: ['bk', 'new']}}], {relativeTo: this.route});
      // this.router.navigate(['bk', this.friend.id]);
    }
  }
  onClose() { this.clicked = false; }

}
