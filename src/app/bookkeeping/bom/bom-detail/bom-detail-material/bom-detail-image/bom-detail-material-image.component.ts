import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { MaterialBOM } from '../../../bom.model';

@Component({
  selector: 'app-bom-detail-material-image',
  templateUrl: './bom-detail-material-image.component.html',
  styleUrls: ['./bom-detail-material-image.component.css']
})
export class BomDetailMaterialImageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BomDetailMaterialImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaterialBOM
  ) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
