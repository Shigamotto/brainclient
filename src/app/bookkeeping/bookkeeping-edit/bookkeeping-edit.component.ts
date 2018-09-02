import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { HeaderService } from '../../core/header/header.service';
import { BookkeepingService } from '../bookkeeping.service';
import { BookSheet } from '../bookkeeping.model';
import {WarehouseService} from '../warehouse/warehouse.service';
import {Warehouse} from '../warehouse/warehouse.model';
import {Organization} from '../../organization/organization.model';
import {map, startWith} from 'rxjs/operators';
import {Category} from '../category/category.model';

@Component({
  selector: 'app-bookkeeping-edit',
  templateUrl: './bookkeeping-edit.component.html',
  styleUrls: ['./bookkeeping-edit.component.css']
})
export class BookkeepingEditComponent implements OnInit {
  private id: number;
  editMode = false;
  isSimple = true;

  sheetForm: FormGroup;
  warehouses: Warehouse[];
  filteredWarehouse: Observable<Warehouse[]>;

  subscription: Subscription;
  public bookSheet: BookSheet = BookSheet.EMPTY_MODEL;

  constructor(
    private headService: HeaderService,
    private bkService: BookkeepingService,
    private route: ActivatedRoute,
    private whService: WarehouseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.initForm();
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          if (this.editMode) {
            this.whService.getWarehouses();
            this.whService.WHChanged.subscribe((warehouses: Warehouse[]) => {
              this.warehouses = warehouses;
              this.filteredWarehouse = this.sheetForm.get('warehouse').valueChanges
                .pipe(
                  startWith<string | Warehouse >(''),
                  map(value => typeof value === 'string' ? value : value.name),
                  map(name => name ? this._filterWarehouses(name) : this.warehouses.slice())
                );
            });
            this.bkService.getBookSheet(this.id);
            this.subscription = this.bkService.sheetChose.subscribe(
              (sheet: BookSheet) => {
                this.bookSheet = sheet;
                this.sheetForm.patchValue({
                  'title': sheet.title,
                  // 'simple': new FormControl(sheetSimple, Validators.required),
                  'desc': sheet.desc,
                  'date_pub': sheet.date_pub,
                  'amount': sheet.amount,
                  'warehouse': sheet.warehouse,
                });
                if (sheet['lines']) {
                  for (const line of sheet.lines) {
                    (<FormArray>this.sheetForm.controls['lines']).push(
                      new FormGroup({
                        'name': new FormControl(line.name),
                        'price': new FormControl(line.price),
                        'count': new FormControl(line.count),
                        'amount': new FormControl(line.amount)
                      })
                    );
                  }
                }
              }
            );
          }
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.headService.setStatus( undefined );
    this.headService.setWidget( undefined );
  }

  onSubmit() {
    // console.log(this.sheetForm.value);
    // console.log(this.bookSheet);
    this.bkService.editBookSheet(this.id, this.sheetForm.value);
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

  addNewLine() {
    (<FormArray>this.sheetForm.controls['lines']).push(
      new FormGroup({
        'name': new FormControl(''),
        'price': new FormControl(''),
        'count': new FormControl(''),
        'amount': new FormControl('')
      })
    );
  }

  private initForm() {
    const sheetTitle = '';
    const sheetSimple = true;
    const sheetDesc = '';
    const sheetLines = new FormArray([]);
    const sheetDatePub = '';
    const sheetAmount = 0;
    const sheetCreatedBy = '';
    const sheetStatusPay = 0;
    const sheetStatusGet = 0;
    const sheetStatusHistory = {};
    const sheetFrom = {};
    const sheetTo = {};
    const sheetWarehouse = 0;

    this.sheetForm = new FormGroup({
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
      'warehouse': new FormControl(sheetWarehouse, Validators.required),
    });
  }

  sheetSimpleToggle() {
    this.isSimple = !this.isSimple;
  }

  private _filterWarehouses(value: string): Warehouse[] {
    const filterValue = value.toLowerCase();

    return this.warehouses.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayWarehouseFn(data?: Warehouse): string | undefined {
    return data ? data.name : undefined;
  }

}
