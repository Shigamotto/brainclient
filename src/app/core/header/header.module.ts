import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// import { HeaderBKComponent } from '../../bookkeeping/header-bookkeeping/header.bk.component';
import { HeaderComponent } from './header.component';
import { HeaderSharedComponent } from './header-shared/header-shared.component';

import { HeaderService } from './header.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderSharedComponent,
    // HeaderBKComponent,#
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    HeaderService,
  ]
})
export class HeaderModule {}
