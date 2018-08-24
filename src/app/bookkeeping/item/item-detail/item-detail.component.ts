import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { HeaderService } from '../../../core/header/header.service';
import { ItemService } from '../item.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  private id: number;
  private whomIsOpen = true;

  item: Item = Item.EMPTY_MODEL;
  subscription: Subscription;

  constructor(
    private headService: HeaderService,
    private itemService: ItemService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.itemService.getItem(this.id);
          this.subscription = this.itemService.ItemChose.subscribe(
            (data: Item) => {
              this.item = data;
              // this.headService.setStatus( 'get paid ' + sheet.status_get.toString() + sheet.status_pay.toString());
              // this.headService.setWidget( sheet.amount.toString() );
              // if (this.bookSheet.simple) {
              //   this.whomIsOpen = false;
              // }
            }
          ); }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.headService.setStatus( undefined );
    this.headService.setWidget( undefined );
  }

  openWhom() {
    console.log('need to open whom');
    this.whomIsOpen = !this.whomIsOpen;
  }

}
