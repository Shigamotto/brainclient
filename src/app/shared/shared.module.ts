import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Safe } from './html.pipe';
import { AutosizeDirective } from './autosize.directive';

import { AccordionModule } from './accordion';
// import { DropdownModule } from './dropdown/dropdown.module';

// import { DropdownDirective } from './dropdown.directive';


@NgModule({
  imports: [
    // DropdownModule,
    // AccordionModule
  ],
  declarations: [
    AutosizeDirective,
    Safe
  ],
  exports: [
    CommonModule,
    AccordionModule,
    // DropdownModule,
    AutosizeDirective,
    Safe
  ]
})
export class SharedModule {}
