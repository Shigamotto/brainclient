import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ItemComponent } from './item.component';

import { ItemService } from './item.service';

// import { HeaderBOMComponent } from './header-bom/header.bom.component';

import { SharedModule } from '../../shared/shared.module';
import { ItemRoutingModule } from './item-routing.module';

@NgModule({
  declarations: [
    ItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ItemRoutingModule,
    SharedModule
  ],
  providers: [
    ItemService,
  ]
})
export class ItemModule {}
