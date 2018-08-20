import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WarehouseService } from '../warehouse.service';
import { Warehouse } from '../warehouse.model';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {
  subscription: Subscription;
  warehouses: Warehouse[];

  constructor(private whService: WarehouseService ) { }

  ngOnInit() {
    this.whService.getWarehouses();
    this.subscription = this.whService.WHChanged
      .subscribe(
        (data: Warehouse[]) => {
          this.warehouses = data;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
