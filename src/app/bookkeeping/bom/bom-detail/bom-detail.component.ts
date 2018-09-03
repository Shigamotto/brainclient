import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { HeaderService } from '../../../core/header/header.service';
import { BOMService } from '../bom.service';
import { BOM } from '../bom.model';

@Component({
  selector: 'app-bom-detail',
  templateUrl: './bom-detail.component.html',
  styleUrls: ['./bom-detail.component.css']
})
export class BOMDetailComponent implements OnInit {
  private id: number;
  private extraMode = false;

  bom: BOM = BOM.EMPTY_MODEL;
  subscription: Subscription;

  constructor(
    private bomService: BOMService,
    private headService: HeaderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.bomService.getBOM(this.id);
          this.subscription = this.bomService.BOMChose.subscribe(
            (data: BOM) => {
              this.bom = new BOM(
                data.name,
                data.id,
                data.date_pub,
                data.desc,
                data.amount,
                data.parent,
                data.draft,
                data.org,
                data.bill,
                data.bill_extra,
                data.path,
              );
            }
          );
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // this.headService.setStatus( undefined );
    // this.headService.setWidget( undefined );
  }

  bomChangeMode() {
    this.extraMode = !this.extraMode;
  }

}
