import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BOMService } from '../bom.service';
import { BOM } from '../bom.model';

@Component({
  selector: 'app-bom-list',
  templateUrl: './bom-list.component.html',
  styleUrls: ['./bom-list.component.css']
})
export class BOMListComponent implements OnInit {
  subscription: Subscription;
  boms: BOM[];

  constructor(
    private bomService: BOMService
  ) { }

  ngOnInit() {
    console.log('Load LIST');
    this.bomService.getBOMs();
    this.subscription = this.bomService.BOMsChanged
      .subscribe(
        (data: BOM[]) => {
          console.log(data);
          this.boms = data;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
