import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, merge } from 'rxjs';
import { merge as mergeStatic } from 'rxjs/operators';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { HeaderService } from '../../../core/header/header.service';
import { BOMService } from '../bom.service';
import { BOM } from '../bom.model';
import { OrganizationService } from '../../../organization/organization.service';
import { Organization } from '../../../organization/organization.model';
import { Item } from '../../item/item.model';
import { ItemService } from '../../item/item.service';

import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-bom-edit',
  templateUrl: './bom-edit.component.html',
  styleUrls: ['./bom-edit.component.css']
})
export class BOMEditComponent implements OnInit, OnDestroy {
  private id: number;
  editMode = false;

  bomForm: FormGroup;
  organizations: Organization[];
  filteredOrganizations: Observable<Organization[]>;
  parents: BOM[];
  filteredParents: Observable<BOM[]>;
  items: Item[];
  filteredItems: Observable<Item[]>;

  subscription: Subscription;
  public bom: BOM = BOM.EMPTY_MODEL;

  constructor(
    private bomService: BOMService,
    private orgService: OrganizationService,
    private itemService: ItemService,
    private headService: HeaderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.initForm();

          // GetOrganizations
          this.orgService.getOrganizations();
          this.orgService.orgsChanged.subscribe((data: Organization[]) => {
            this.organizations = data;
            this.filteredOrganizations = this.bomForm.get('org').valueChanges
              .pipe(
                startWith<string | Organization >(''),
                map(value => typeof value === 'string' ? value : value.name),
                map(name => name ? this._filterOrganizations(name) : this.organizations.slice())
              );
          });

          // GetParents
          this.bomService.getBOMs();
          this.bomService.BOMsChanged.subscribe((data: BOM[]) => {
            this.parents = data;
            this.filteredParents = this.bomForm.get('parent').valueChanges
              .pipe(
                startWith<string | BOM >(''),
                map(value => typeof value === 'string' ? value : value.name),
                map(name => name ? this._filterParents(name) : this.parents.slice())
              );
          });

          // Init form values
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          if (this.editMode) {
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
                this.bomForm.patchValue({
                  'name': data.name,
                  'id': data.id,
                  'date_pub': data.date_pub,
                  'desc': data.desc,
                  'amount': data.amount,
                  'parent': data.parent ? data.parent : '',
                  'draft': data.draft,
                  'org': data.org ? data.org : '',
                  'path': data.path,
                });
                if (data['bill']) {
                  for (const line of data.bill) {
                    (<FormArray>this.bomForm.controls['bill']).push(
                      new FormGroup({
                        'name': new FormControl(line.name),
                        'count': new FormControl(line.count),
                        'price': new FormControl(line.price),
                      })
                    );
                  }
                }

                // GetItems
                this.itemService.getItems();
                this.itemService.ItemsChanged.subscribe((items: Item[]) => {
                  this.items = items;
                  this.filteredItems = (this.bomForm.controls['bill'] as FormArray).controls[0].get('name').valueChanges
                    .pipe(
                      startWith<string | Item >(''),
                      map(value => typeof value === 'string' ? value : value.name),
                      map(name => name ? this._filterItems(name) : this.items.slice())
                    );
                  for (let i = 1; i < (this.bomForm.controls['bill'] as FormArray).length; i++) {
                    this.filteredItems = merge(this.filteredItems, (this.bomForm.controls['bill'] as FormArray).controls[i].get('name')
                      .valueChanges
                      .pipe(
                        startWith<string | Item>(''),
                        map(value => typeof value === 'string' ? value : value.name),
                        map(name => name ? this._filterItems(name) : this.items.slice())
                      )
                    );
                  }
                });
              });
          }
        });
  }

  ngOnDestroy() {
    // this.headService.setStatus( undefined );
    // this.headService.setWidget( undefined );
  }

  onSubmit() {
    if (this.editMode) {
      console.log('edit sheet');
      this.bomService.editBOM(this.id, this.bomForm.value).subscribe(
        res => {console.log(res); },
      error => {console.log(error); }
      );
    } else {
      console.log('add sheet');
      this.bomService.addBOM(this.bomForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  addNewLine() {
    (<FormArray>this.bomForm.controls['bill']).push(
      new FormGroup({
        'name': new FormControl(''),
        'price': new FormControl(''),
        'count': new FormControl(''),
      })
    );
    const bill_length = (this.bomForm.controls['bill'] as FormArray).length;
    this.filteredItems = merge(this.filteredItems, (this.bomForm.controls['bill'] as FormArray).controls[bill_length - 1].get('name')
      .valueChanges
      .pipe(
        startWith<string | Item>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterItems(name) : this.items.slice())
      )
    );
  }

  private initForm() {
    // const bomItem = '';
    const bomName = '';
    const bomId = 0;
    const bomDatePub = '';
    const bomDesc = '';
    const bomAmount = 0;
    const bomParent = '';
    const bomDraft = true;
    const bomOrg = '';
    const bomBill = new FormArray([]);
    const bomPath = '';

    this.bomForm = new FormGroup({
      'name': new FormControl(bomName, Validators.required),
      'id': new FormControl(bomId),
      'date_pub': new FormControl(bomDatePub),
      'desc': new FormControl(bomDesc),
      'amount': new FormControl(bomAmount),
      'parent': new FormControl(bomParent),
      'draft': new FormControl(bomDraft, Validators.required),
      'org': new FormControl(bomOrg, Validators.required),
      'bill': bomBill,
      'path': new FormControl(bomPath)
    });
  }
  private _filterOrganizations(value: string): Organization[] {
    const filterValue = value.toLowerCase();
    return this.organizations.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  displayOrganizationFn(data?: Organization): string | undefined {
    return data ? data.name : undefined;
  }

  private _filterParents(value: string): BOM[] {
    const filterValue = value.toLowerCase();
    return this.parents.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  displayParentFn(data?: BOM): string | undefined {
    return data ? data.name : undefined;
  }

  private _filterItems(value: string): Item[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  displayItemFn(data?: Item): string | undefined {
    return data ? data.name : undefined;
  }
}
