import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { HeaderService } from '../../core/header/header.service';
import { BookkeepingService } from '../bookkeeping.service';
import { BookSheet } from '../bookkeeping.model';

@Component({
  selector: 'app-bookkeeping-edit',
  templateUrl: './bookkeeping-edit.component.html',
  styleUrls: ['./bookkeeping-edit.component.css']
})
export class BookkeepingEditComponent implements OnInit {
  private id:number;
  editMode = false;

  sheetForm: FormGroup;

  subscription: Subscription;
  public bookSheet:BookSheet = BookSheet.EMPTY_MODEL;

  constructor(
    private headService: HeaderService,
    private bkService: BookkeepingService,
    private route: ActivatedRoute,
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
                });
                if (sheet['lines']) {
                  for (let line of sheet.lines) {
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
            )
          }
        }
      );
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

  addNewLine() {
    (<FormArray>this.sheetForm.controls['lines']).push(
      new FormGroup({
        'name': new FormControl(""),
        'price': new FormControl(""),
        'count': new FormControl(""),
        'amount': new FormControl("")
      })
    );
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
      // 'warehouse': new FormControl(sheetWarehouse, Validators.required),
    });
  }

}
