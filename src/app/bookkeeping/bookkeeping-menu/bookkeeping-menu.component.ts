import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Subject} from 'rxjs';

import { BookSheet } from '../bookkeeping.model';
import {BookkeepingService} from '../bookkeeping.service';

@Component({
  selector: 'app-bookkeeping-menu',
  templateUrl: './bookkeeping-menu.component.html',
  styleUrls: ['./bookkeeping-menu.component.css']
})
export class BookkeepingMenuComponent implements OnInit {
  public id: number;
  public idChose = new Subject<number>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bkgService: BookkeepingService,
  ) { }

  ngOnInit() {
    this.bkgService.sheetChose.subscribe( (booksheet: BookSheet) => {
      this.setId(booksheet.id);
    });
  }

  setId(id: number) {
    this.id = id;
    this.idChose.next(this.id);
  }

  removeId() {
    this.id = undefined;
    this.idChose.next(this.id);
  }

  onEdit() {
    this.router.navigate(['../bk/'], { relativeTo: this.route });
  }

  markThis() {

  }

  onDelete() {
    this.bkgService.deleteBookSheet(this.id);
    this.router.navigate(['../bk/'], { relativeTo: this.route });
  }

  ngOnDestroy() {
  }

}
