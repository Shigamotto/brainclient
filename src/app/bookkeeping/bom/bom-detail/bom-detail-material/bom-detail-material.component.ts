import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { MaterialBOM } from '../../bom.model';
import {BomDetailMaterialImageComponent} from './bom-detail-image/bom-detail-material-image.component';
import {Item} from '../../../item/item.model';

@Component({
  selector: 'app-bom-detail-material',
  templateUrl: './bom-detail-material.component.html',
  styleUrls: ['./bom-detail-material.component.css']
})
export class BOMDetailMaterialComponent implements OnInit {
  @Input() materialBOM: MaterialBOM;
  @Input() level = 0;
  @Input() index: number;
  private clicked = false;
  range = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.range = new Array(this.level);
  }

  onClick() {
    this.clicked = !this.clicked;
  }

  openImage(): void {
    const dialogRef = this.dialog.open(BomDetailMaterialImageComponent, {
      data: { image: this.materialBOM.image }
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  displayItemFn(data?: Item | string): string | undefined {
    if (typeof data === 'string') {
      return data;
    } else {
      return data.name;
    }
  }

}
