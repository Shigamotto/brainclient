import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BookkeepingService } from '../bookkeeping.service';
import { BookSheet } from '../bookkeeping.model';

@Component({
  selector: 'app-bookkeeping-list',
  templateUrl: './bookkeeping-list.component.html',
  styleUrls: ['./bookkeeping-list.component.css']
})
export class BookkeepingListComponent implements OnInit {
  subscription: Subscription;
  sheets: BookSheet[];

  constructor(private bkService: BookkeepingService ) { }

  ngOnInit() {
    console.log('Load LIST');
    this.bkService.getBookSheets();
    this.subscription = this.bkService.sheetChanged
      .subscribe(
        (sheets: BookSheet[]) => {
          this.sheets = sheets;
        });
    // this.bkService.clearBookSheet();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
