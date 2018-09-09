import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MaterialBOM } from '../../../bom.model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bom-edit-material-image',
  templateUrl: './bom-edit-material-image.component.html',
  styleUrls: ['./bom-edit-material-image.component.css']
})
export class BomEditMaterialImageComponent implements OnInit {
  image: {id: string, name: string, image: File, file: File};
  file: File;

  constructor(
    public dialogRef: MatDialogRef<BomEditMaterialImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaterialBOM
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close(this.image);
  }

  addNewImage($event?) {
    const imageFile = $event.target.files[0];
    const fileName = imageFile.name;
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = (event: any) => {
      this.image = {
        'id': this.data ? this.data.id : '',
        'name': fileName,
        'image': event.target.result,
        'file': imageFile,
      };
      // if (this.data) {
      //   this.image['id'] = this.data.id ? this.data.id : '';
      // }
      this.file = imageFile;
    };
  }

  SavingData() {
    this.dialogRef.close(this.image);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
