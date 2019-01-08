import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ItemService } from '../item.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {
  subscriptionItems: Subscription;
  subscriptionItem: Subscription;
  items: Item[];
  checkedItem: number[] = [];
  chosenId: number;

  constructor(private itemService: ItemService ) { }

  ngOnInit() {
    console.log('Load LIST');

    this.itemService.getItems();
    this.subscriptionItems = this.itemService.ItemsChanged
      .subscribe(
        (data: Item[]) => {
          this.items = data;
        });
    this.subscriptionItem = this.itemService.ItemChose
      .subscribe(
      (data: Item) => {
        this.setId(data.id);
      });
    this.itemService.oldItem();
    // this.bkService.clearBookSheet();
  }

  setId(id: number) {
    this.chosenId = id;
  }

  onCheckBoxChange(value: {id: number, checked: boolean}) {
    if (value.checked) {
      this.checkedItem.push(value.id);
    } else {
      this.checkedItem = this.checkedItem.filter(function(e) { return e !== value.id; });
    }
    console.log(this.checkedItem);
  }

  ngOnDestroy() {
    this.subscriptionItems.unsubscribe();
    this.subscriptionItem.unsubscribe();
  }

}
