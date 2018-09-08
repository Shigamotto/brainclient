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

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public addImage: EventEmitter<{id: number, name: string, image: File}> = new EventEmitter<{id: number, name: string, image: File}>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    // console.log(this.materialBOM);
    this.range = new Array(this.level);
  }

  static buildItem(line?) {
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
        'child': childs,
      });
    } else {
      return new FormGroup({
        'id': new FormControl( ''),
        'name': new FormControl( ''),
        'count': new FormControl( ''),
        'price': new FormControl( ''),
        'child': childs,
      });
    }
  }

  openImage(): void {
    const dialogRef = this.dialog.open(BomEditMaterialImageComponent, {
      data: { image: this.materialBOM.image, id: this.materialBOM.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.materialBOM.image = result.image;
        this.addImage.emit(result);
      }
    });
  }

  addSubLine() {
    (<FormArray>this.formControlBom.controls['child']).push(
      BOMEditMaterialComponent.buildItem()
    );
  }

  displayItemFn(data?: Item | string): string | undefined {
    if (typeof data === 'string') {
      return data;
    } else {
      return data.name;
    }
  }

}
