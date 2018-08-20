import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { HeaderService } from '../../../core/header/header.service';
import { WarehouseService } from '../warehouse.service';
import { Warehouse } from '../warehouse.model';

@Component({
  selector: 'app-warehouse-settings',
  templateUrl: './warehouse-settings.component.html',
  styleUrls: ['./warehouse-settings.component.css']
})
export class WarehouseSettingsComponent implements OnInit {
  private id:number;
  editMode = false;

  warehouseForm: FormGroup;

  subscription: Subscription;
  public warehouse: Warehouse = Warehouse.EMPTY_MODEL;

  constructor(
    private headService: HeaderService,
    private whService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.initForm();
    //       this.id = +params['id'];
    //       this.editMode = params['id'] != null;
    //       if (this.editMode) {
    //         this.whService.getWarehouse(this.id);
    //         this.subscription = this.whService.sheetChose.subscribe(
    //           (data: Warehouse) => {
    //             this.warehouse = data;
    //             this.warehouseForm.patchValue({
    //               'title': data.name,
    //               'desc': data.desc,
    //               'date_pub': data.date_pub,
    //               'amount': sheet.amount,
    //             });
    //             if (sheet['lines']) {
    //               for (let line of sheet.lines) {
    //                 (<FormArray>this.sheetForm.controls['lines']).push(
    //                   new FormGroup({
    //                     'name': new FormControl(line.name),
    //                     'price': new FormControl(line.price),
    //                     'count': new FormControl(line.count),
    //                     'amount': new FormControl(line.amount)
    //                   })
    //                 );
    //               }
    //             }
    //           }
    //         )
    //       }
    //     }
    //   );
  }

  ngOnDestroy() {
    this.headService.setStatus( undefined );
    this.headService.setWidget( undefined );
  }

  onSubmit() {
    if (this.editMode) {
      console.log('edit sheet');
      // this.bkService.updateSheet(this.id, this.sheetForm.value);
    } else {
      console.log('add sheet');
      // this.bkService.addSheet(this.sheetForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let sheetTitle = '';
    let sheetSimple = true;
    let sheetDesc = '';
    let sheetLines = new FormArray([]);
    let sheetDatePub = '';
    let sheetAmount = 0;
    let sheetCreatedBy = '';
    let sheetStatusPay = 0;
    let sheetStatusGet = 0;
    let sheetStatusHistory = {};
    let sheetFrom = {};
    let sheetTo = {};
    let sheetWarehouse = {};

    console.log(sheetTitle);
    this.warehouseForm = new FormGroup({
      'title': new FormControl(sheetTitle, Validators.required),
      // 'simple': new FormControl(sheetSimple, Validators.required),
      'desc': new FormControl(sheetDesc, Validators.required),
      'lines': sheetLines,
      'date_pub': new FormControl(sheetDatePub, Validators.required),
      'amount': new FormControl(sheetAmount, Validators.required),
      // 'created_by': new FormControl(sheetCreatedBy, Validators.required),
      // 'status_pay': new FormControl(sheetStatusGet, Validators.required),
      // 'status_get': new FormControl(sheetStatusPay, Validators.required),
      // 'status_history': new FormControl(sheetStatusHistory, Validators.required),
      // 'from': new FormControl(sheetFrom, Validators.required),
      // 'to': new FormControl(sheetTo, Validators.required),
      // 'warehouse': new FormControl(sheetWarehouse, Validators.required),
    });
  }

}
