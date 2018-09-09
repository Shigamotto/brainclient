import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MaterialBOM } from '../../bom.model';
import { merge, Observable } from 'rxjs';
import {Item} from '../../../item/item.model';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import {MatDialog} from '@angular/material';

import { BomEditMaterialImageComponent } from './bom-edit-image/bom-edit-material-image.component';

@Component({
  selector: 'app-bom-edit-material',
  templateUrl: './bom-edit-material.component.html',
  styleUrls: ['./bom-edit-material.component.css']
})
export class BOMEditMaterialComponent implements OnInit {
  @Input() materialBOM: MaterialBOM;
  @Input() formControlBom: FormGroup;
  @Input() filteredItems: Observable<Item[]>;
  @Input() items: Item[];
  @Input() level: number;
  @Input() inde: string;
  range = [];
  image: {id: string, image?: File, file?: File};


  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public addImage: EventEmitter<{id: number, name: string, image: File}> = new EventEmitter<{id: number, name: string, image: File}>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    if (this.materialBOM.id.toString().startsWith('New')) {
      this.materialBOM.id = this.materialBOM.id + '.' + this.inde;
    }
    this.image = { id: this.materialBOM.id };
    this.range = new Array(this.level);
    console.log(this.materialBOM);
  }

  static buildItem(line?, id?) {
    const childs = new FormArray([]);

    if (line) {
      if (line.child) {
        for (const child of line.child) {
          childs.push(
            BOMEditMaterialComponent.buildItem(child)
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

  addSubLine() {
    const subline = MaterialBOM.EMPTY_MODEL;
    if (this.materialBOM.id.toString().startsWith('New')) {
      subline.id = this.materialBOM.id;
    } else {
      subline.id = 'New ' + this.materialBOM.id;
    }
    this.materialBOM.child.push(subline);
    (<FormArray>this.formControlBom.controls['child']).push( BOMEditMaterialComponent.buildItem( undefined, subline.id) );
  }

  displayItemFn(data?: Item | string): string | undefined {
    if (typeof data === 'string') {
      return data;
    } else {
      return data.name;
    }
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

  materialBOMChild(i: number): MaterialBOM {
    if (this.materialBOM.child) {
      if (this.materialBOM.child[i]) {
        return this.materialBOM.child[i];
      }
    }
    return MaterialBOM.EMPTY_MODEL;
  }

}
