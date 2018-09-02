import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
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
  private classifierIsOpen = false;
  private picIsOpen = false;
  private pricesIsOpen = false;

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
              this.item = new Item(
                data.id,
                data.name,
                data.article,
                data.category,
                data.category_name,
                data.desc,
                data.related,
                data.images,
                data.attribute,
                data.testing,
                data.batch,
                data.classifier,
                data.produce,
                data.produce_name,
                data.cost,
                data.tax,
                data.price,
                data.history,
                data.consumer
              );
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

  openClassifier() {
    this.classifierIsOpen = !this.classifierIsOpen;
    this.pricesIsOpen = false;
  }

  openPicture() {
    this.picIsOpen = !this.picIsOpen;
  }

  openPrices() {
    this.pricesIsOpen = !this.pricesIsOpen;
    this.classifierIsOpen = false;
  }

  openImage(id: number) {
    const images = document.getElementsByClassName('item-image');
    [].forEach.call(images, function(el) {
      el.classList.remove('open');
    });
    images[id].classList.add('open');
  }

}
