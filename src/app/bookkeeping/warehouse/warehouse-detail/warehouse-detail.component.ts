import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { HeaderService } from '../../../core/header/header.service';
import { WarehouseService } from '../warehouse.service';
import { Warehouse } from '../warehouse.model';

@Component({
  selector: 'app-warehouse-detail',
  templateUrl: './warehouse-detail.component.html',
  styleUrls: ['./warehouse-detail.component.css']
})
export class WarehouseDetailComponent implements OnInit {
  private id:number;

  warehouse:Warehouse = Warehouse.EMPTY_MODEL;
  subscription: Subscription;

  constructor(
    private headService: HeaderService,
    private whService: WarehouseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.whService.getWarehouse(this.id);
          this.subscription = this.whService.WHChose.subscribe(
            (data:Warehouse) => {
              this.warehouse = data;
            }
          )
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
