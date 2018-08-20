import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { BookSheet } from '../../bookkeeping.model';

@Component({
  selector: 'app-bookkeeping-list-item',
  templateUrl: './bookkeeping-list-item.component.html',
  styleUrls: ['./bookkeeping-list-item.component.css']
})
export class BookkeepingListItemComponent implements OnInit {
  @Input() sheet: BookSheet;
  @Input() index: number;
  private clicked: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  onClick(){
    if (!this.clicked) {
      this.clicked = true;
    } else {
      // this.router.navigate([{outlets: {booksheet: [this.sheet.id, 'edit']}}]);
      // this.router.navigate([{outlets: {booksheet: ['bk', 'new']}}], {relativeTo: this.route});
      this.router.navigate(['bk', this.sheet.id]);
    }
  }
  onClose() { this.clicked = false; }

}
