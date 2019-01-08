import { Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { MaterialBOM } from '../../bom.model';
import { merge, Observable, throwError } from 'rxjs';
import { Item } from '../../../item/item.model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { map, startWith, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { BomEditMaterialImageComponent } from './bom-edit-image/bom-edit-material-image.component';
import { BomStorage } from '../../bom.storage';

@Component({
  selector: 'app-bom-edit-material',
  templateUrl: './bom-edit-material.component.html',
  styleUrls: ['./bom-edit-material.component.css']
})
export class BOMEditMaterialComponent implements OnInit, OnChanges {
  @Input() materialBOM: MaterialBOM;
  @Input() formControlBom: FormGroup;
  @Input() filteredItems: Observable<Item[]>;
  @Input() items: Item[];

  range = [];
  image: {id: string, image?: File, file?: File};
  // bomStorage: BomStorage;

  @Output()
  public addSubLineMaterial: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public addImage: EventEmitter<{id: number, name: string, image: File}> = new EventEmitter<{id: number, name: string, image: File}>();

  constructor(public dialog: MatDialog, public bomStorageMaterial: BomStorage) { }

  ngOnInit() {
    if (this.materialBOM.id.toString().startsWith('New')) { this.formControlBom.patchValue( {id: this.materialBOM.id});  }
    this.image = { id: this.materialBOM.id };
    this.range = new Array(this.materialBOM.bom_service_level);

    this.filteredItems = this.formControlBom.get('name')
      .valueChanges
      .pipe(
        startWith<string | Item>(''),
        map(value => {console.log(value); return value; }),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterItems(name) : this.items.slice()),
        catchError(error => { return throwError(error); })
      );
  }

  ngOnChanges() {
    this.range = new Array(this.materialBOM.bom_service_level);
  }

  changeMaterialName($event) {
    console.log($event.value);
    this.materialBOM.name = $event.value;
  }

  buildItem(line?, storage?: BomStorage, id?, ) {
    storage._addMaterial(line);
    const childs = new FormArray([]);

    if (line) {
      if (line.child) {
        for (const child of line.child) {
          childs.push(
            this.buildItem(child, storage)
          );
        }
      }
      return new FormGroup({
        'id': new FormControl(line.id ),
        'name': new FormControl(line.name ),
        'count': new FormControl(line.count ),
        'price': new FormControl(line.price),
        'image': new FormControl(line.image),
        'child': childs,
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
        'child': childs,
      });
    }
  }

  // static buildItem(line?, storage?: BomStorage, id?, ) {
  //   storage._addMaterial(line);
  //   const childs = new FormArray([]);
  //
  //   if (line) {
  //     if (line.child) {
  //       for (const child of line.child) {
  //         childs.push(
  //           BOMEditMaterialComponent.buildItem(child, storage)
  //         );
  //       }
  //     }
  //     return new FormGroup({
  //       'id': new FormControl(line.id ),
  //       'name': new FormControl(line.name ),
  //       'count': new FormControl(line.count ),
  //       'price': new FormControl(line.price),
  //       'image': new FormControl(line.image),
  //       'child': childs,
  //     });
  //   } else {
  //     const newId = id ? id : '';
  //     // if (id.toString().startsWith('New')) {
  //     //   newId = id + '.' + this.inde;
  //     // }
  //     return new FormGroup({
  //       'id': new FormControl( newId),
  //       'name': new FormControl( ''),
  //       'count': new FormControl( ''),
  //       'price': new FormControl( ''),
  //       'image': new FormControl(''),
  //       'child': childs,
  //     });
  //   }
  // }

  openImage(): void {
    let data = {};
    if (this.image) {
      data = {
        image: this.materialBOM.image ? this.materialBOM.image : this.image.image,
        id: this.image.id
      };
    }
    const dialogRef = this.dialog.open(BomEditMaterialImageComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.image['id'] = result.id;
        this.image['image'] = result.image;
        this.image['file'] = result.file;
        this.addImage.emit(result);
      }
    });
  }
  imageIsHere(): boolean {
    if (this.materialBOM) {
      if (this.materialBOM.image) {
        return false;
      } else if (this.image.image) {
        return false;
      }
    }
    return true;
  }

  // addSubLine() {
  //   const subline = MaterialBOM.EMPTY_MODEL;
  //   if (this.materialBOM.id.toString().startsWith('New')) {
  //     subline.id = this.materialBOM.id;
  //   } else {
  //     subline.id = 'New ' + this.materialBOM.id;
  //   }
  //   this.materialBOM.child.push(subline);
  //   // (<FormArray>this.formControlBom.controls['child']).push( this.buildItem( undefined, this.bomStorage, subline.id) );
  // }

  displayItemFn(data?: Item | string): string | undefined {
    if (typeof data === 'string') {
      return data;
    } else {
      return data.name;
    }
  }
  private _filterItems(value: string): Item[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  addNewImage($event) { this.addImage.emit($event); }



}
