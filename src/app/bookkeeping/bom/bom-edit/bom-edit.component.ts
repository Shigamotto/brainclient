import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable, Subscription, merge, from, empty } from 'rxjs';
import { map, startWith, concatMap, tap, finalize } from 'rxjs/operators';

import { HeaderService } from '../../../core/header/header.service';
import { BOMService } from '../bom.service';
import { BOM, MaterialBOM } from '../bom.model';
import { OrganizationService } from '../../../organization/organization.service';
import { Organization } from '../../../organization/organization.model';
import { Item } from '../../item/item.model';
import { ItemService } from '../../item/item.service';

import { BOMEditMaterialComponent } from './bom-edit-material/bom-edit-material.component';
import { BomStorage } from '../bom.storage';

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
  items: Item[] = [];
  filteredItems: Observable<Item[]>;

  // bomStorage: BomStorage

  images: {id: number, name: string, image: File, file?: File}[] = [];

  subscription: Subscription;
  public bom: BOM = BOM.EMPTY_MODEL;

  constructor(
    private bomService: BOMService,
    private bomStorage: BomStorage,
    private orgService: OrganizationService,
    private itemService: ItemService,
    private headService: HeaderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  buildMaterial(line?, parent_id?: string, level?: number ) {
    if (line) {
      const material = this.bomStorage._addMaterial(line, undefined, parent_id, level);
      if (line.child) {
        for (const child of line.child) {
          this.buildMaterial(child, material.id, material.level);
        }
      }
    }
  }

  buildItem(line?, id?, parent_id?: string, level?: number ) {
    // const material = this.bomStorage._addMaterial(line, undefined, parent_id, level);
    // const childs = (<FormArray>this.bomForm.controls['bill']);  // const childs = new FormArray([]);

    if (line) {
      // if (line.child) {
      //   for (const child of line.child) {
      //     (<FormArray>this.bomForm.controls['bill']).push(
      //       this.buildItem(child, undefined, line.bom_service_id, line.bom_service_level)
      //     );
      //   }
      // }
      // const bomMaterial = this.bomStorage.getMaterial(line.bom_service_id); console.log(bomMaterial);
      return new FormGroup({
        'id': new FormControl(line.id ),
        'name': new FormControl(line.name ),
        'count': new FormControl(line.count ),
        'price': new FormControl(line.price),
        'image': new FormControl(line.image),
        // 'child': childs,
      });
    } else {
      const newId = id ? id : '';
      // if (id.toString().startsWith('New')) {
      //   newId = id + '.' + this.inde;
      // }
      return new FormGroup({
        'id': new FormControl( newId),
        'name': new FormControl( ''),
        'count': new FormControl( ''),
        'price': new FormControl( ''),
        'image': new FormControl(''),
        // 'child': childs,
      });
    }
  }

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

          // GetBOMParents
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
                // GetItems
                this.itemService.getItems();
                this.itemService.ItemsChanged.subscribe((items: Item[]) => {
                  this.items = items;
                  // this.filteredItems = (this.bomForm.controls['bill'] as FormArray).controls[0].get('name').valueChanges
                  //   .pipe(
                  //     startWith<string | Item >(''),
                  //     map(value => typeof value === 'string' ? value : value.name),
                  //     map(name => name ? this._filterItems(name) : this.items.slice())
                  //   );
                  // for (let i = 1; i < (this.bomForm.controls['bill'] as FormArray).length; i++) {
                  //   this.filteredItems = merge(this.filteredItems, (this.bomForm.controls['bill'] as FormArray).controls[i].get('name')
                  //     .valueChanges
                  //     .pipe(
                  //       startWith<string | Item>(''),
                  //       map(value => {console.log(value); return value}),
                  //       map(value => typeof value === 'string' ? value : value.name),
                  //       map(name => name ? this._filterItems(name) : this.items.slice())
                  //     )
                  //   );
                  // }
                });

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
                  for (const line of data.bill) { this.buildMaterial(line); }
                  for (const line of this.bomStorage.materials) {
                    (<FormArray>this.bomForm.controls['bill']).push( this.buildItem(line) );
                  }
                  console.log(this.bomStorage.materials);
                }

              });
          }
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // this.headService.setStatus( undefined );
    // this.headService.setWidget( undefined );
  }

  findImageId(id, images = this.images) { return images.filter( (data: {id: number, name: string, image: File}) => id === data.id); }

  findFormControl(data: any, find_control: string, find: string): FormGroup { // data must by FormArray<FormGroup>
    if (data) {
      for (let i = 0; i < (data as FormArray).length; i++) {
        if (data.controls[i].controls[find_control].value === find) {
          return data.controls[i];
        } // else if ((data.controls[i].controls['child'] as FormArray).length > 0) {
        //   const control = this.findFormControl((data.controls[i].controls['child'] as FormArray), find_control, find);
        //   if (control) { return control; }
        // }
      }
      return;
    }
  }

  chiSubmit(data: MaterialBOM) {
    if (data.id.toString().startsWith('New')) {
      return this.itemService.addItem({ name: data.name }).pipe(
        map((item_response: any) => {
          const control: FormGroup = this.findFormControl((this.bomForm.controls['bill'] as FormArray), 'id', data.id);
          return { old_id: data.id, id: item_response.id, control: control };
        })
      );
    } else {
      return this.itemService.editItem(data.id, { name: data.name }).pipe(
        map((item_response: any) => {
          const control: FormGroup = this.findFormControl((this.bomForm.controls['bill'] as FormArray), 'id', data.id);
          return { old_id: data.id, id: item_response.id, control: control };
        })
      );
    }
  }

  imageSubmit(id, find_id?) {
    const get_image = id === find_id ? this.findImageId(id) : this.findImageId(find_id) ;
    if (get_image.length > 0) {
      const image: any = get_image[0];
      const formData = new FormData();
      formData.append('name', image.name);
      formData.append('desc', '');
      formData.append('to_send', 'true');
      formData.append('is_top', 'true');
      if (image.image) {
        console.log(image);
        formData.append('image', image.file);
      }
      return this.itemService.postImage(id, formData);
    }
    return empty();
  }

  getItems( data: MaterialBOM[] = this.bomForm.value['bill']): MaterialBOM[] {
    const items = [];
    for (const item of data) {
      items.push(item);
      if (item.child.length > 0) {
        const childs = this.getItems(item.child);
        for (const child of childs) { items.push(child);  }
      }
    }
    return items;
  }

  prepareBill(data = this.bomForm.value['bill']) {
    for (const line of data) {
      if (typeof line.name === 'object') { line.id = line.name.id; line.name = line.name.name;   }
      // if (line.child.length > 0) { line.child = this.prepareBill(line.child);  }
    } return data;
  }

  onSubmit() {
    if (this.editMode) {
      const data = this.bomForm.value;

      /* Make observables */
      if (data.bill) {
        // const bill = this.getItems(data.bill);
        const bill = this.bomStorage.materials;
        from(bill).pipe(
          concatMap( (bill_line: MaterialBOM) => {
            return this.chiSubmit(bill_line);
          }),
          tap((response: {old_id: string, id: string, control: FormGroup}) => {
            if (response.id !== response.old_id) {  response.control.patchValue({ id: response.id }); }
            this.imageSubmit(response.id, response.old_id).pipe(
              tap((photo_response: any) => { response.control.patchValue({ image: photo_response.image }); })
            ).subscribe();
          }),
          finalize( () => {
            const prepareData = this.bomForm.value;
            prepareData.bill = this.prepareBill(this.bomStorage.materials);
            this.bomService.editBOM(this.id, prepareData)
              .pipe(
                finalize( () => {this.onCancel(); })
              )
              .subscribe(
              res => {},
            error => {console.log(error); }
            );
          })
        ).subscribe();
      }
    } else {
      console.log('Add bom');
      this.bomService.addBOM(this.bomForm.value);
    }
  }

  onCancel() { this.router.navigate(['../'], {relativeTo: this.route}); }

  addNewLine(i?) {
    const subline = new MaterialBOM('', '', 0, 0, this.id, '', '', [], 0,
      String(this.bomStorage.materials.length), [], 0);
    subline.id = 'New ';
    // this.bom.bill.push(subline);

    // make new form array
    if (i > -1) {
      const parent = this.bomStorage.getMaterial(i);
      subline.bom_service_level = parent.bom_service_level + 1;
      subline.bom_service_parent = i;
      this.bomStorage.lastid++;
      (<FormArray>this.bomForm.controls['bill']).insert(i + 1, this.buildItem(undefined));
      this.bomStorage.materials.splice(i + 1, 0, subline);
      this.filteredItems = merge(this.filteredItems, (this.bomForm.controls['bill'] as FormArray).controls[i].get('name')
        .valueChanges
        .pipe(
          startWith<string | Item>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filterItems(name) : this.items.slice())
        )
      );
    } else {
      this.bomStorage._addMaterial(subline);
      (<FormArray>this.bomForm.controls['bill']).push(
        this.buildItem( undefined, this.bomStorage, subline.id)
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
  }
  removeBomMaterial($event) {
    (<FormArray>this.bomForm.controls['bill']).removeAt($event);
    const material = this.bomStorage.getMaterial($event);
    const parent = this.bomStorage.getMaterial(material.id);
    if (parent) {
      for (let i = 0; i < parent.bom_service_child.length; i++) {
        if (parent.bom_service_child[i] === material.id) {
          parent.bom_service_child.splice(i, 1);
        }
      }
    }
    this.bomStorage.materials.splice($event, 1 );
  }

  addNewImage(data: any) { this.images.push(data); }

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

  allowDrop($event, id?) {
    $event.preventDefault();
    const material = this.bomStorage.getMaterial(id);
    material.bom_service_over = true;
  }
  dragLeave(id?) {
    const material = this.bomStorage.getMaterial(id);
    material.bom_service_over = false;
  }

  dragStart(ev) {  ev.dataTransfer.setData('text', ev.target.id); }

  drop($event?) {
    const data = $event.dataTransfer.getData('text');
    const material = this.bomStorage.getMaterial(data);

    let target: any;
    $event.preventDefault();
    target = $event.target;
    while (!target.id) { target = target.parentNode; }
    if (data === target.id) { return; }

    this.bomStorage.changeParent(data, target.id);
    this.bomStorage.materials.splice(data, 1 );
    this.bomStorage.materials.splice(+target.id + 1, 0 , material);
    const materialValues = (this.bomForm.controls['bill'] as FormArray).value[data];

    (<FormArray>this.bomForm.controls['bill']).removeAt(data);
    (<FormArray>this.bomForm.controls['bill']).insert(+target.id + 1, this.buildItem(materialValues));
  }
}
