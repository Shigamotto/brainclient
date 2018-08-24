import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ItemService } from '../item.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  subscription: Subscription;
  items: Item[];

  constructor(private itemService: ItemService ) { }

  ngOnInit() {
    console.log('Load LIST');
    this.itemService.getItems();
    this.subscription = this.itemService.ItemsChanged
      .subscribe(
        (data: Item[]) => {
          this.items = data;
        });
    // this.bkService.clearBookSheet();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
