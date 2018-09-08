import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';

import { Safe } from './html.pipe';
import { AutosizeDirective } from './autosize.directive';

import { AccordionModule } from './accordion';
// import { DropdownModule } from './dropdown/dropdown.module';

// import { DropdownDirective } from './dropdown.directive';


@NgModule({
  imports: [
    // DropdownModule,
    // AccordionModule
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatDialogModule
  ],
  declarations: [
    AutosizeDirective,
    Safe
  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatDialogModule,
    AccordionModule,
    // DropdownModule,
    AutosizeDirective,
    Safe
  ]
})
export class SharedModule {}
