import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { HeaderService } from '../../core/header/header.service';
import { BookkeepingService } from '../bookkeeping.service';
import { BookSheet } from '../bookkeeping.model';

@Component({
  selector: 'app-bookkeeping-detail',
  templateUrl: './bookkeeping-detail.component.html',
  styleUrls: ['./bookkeeping-detail.component.css']
})
export class BookkeepingDetailComponent implements OnInit {
  private id:number;
  private whomIsOpen:boolean = true;

  bookSheet:BookSheet = BookSheet.EMPTY_MODEL;
  subscription: Subscription;

  constructor(
    private headService: HeaderService,
    private bkService: BookkeepingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.bkService.getBookSheet(this.id);
          this.subscription = this.bkService.sheetChose.subscribe(
            (sheet:BookSheet) => {
              this.bookSheet = sheet;
              this.headService.setStatus( 'get paid ' + sheet.status_get.toString() + sheet.status_pay.toString());
              this.headService.setWidget( sheet.amount.toString() );
              if (this.bookSheet.simple) {
                this.whomIsOpen = false;
              }
            }
          )
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.headService.setStatus( undefined );
    this.headService.setWidget( undefined );
  }

  openWhom() {
    console.log('need to open whom')
    this.whomIsOpen = !this.whomIsOpen;
  }

}
