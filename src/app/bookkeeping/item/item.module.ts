import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ItemMenuComponent } from './item-menu/item-menu.component';
import { ItemComponent } from './item.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemListElementComponent } from './item-list/item-list-element/item-list-element.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

import { ItemService } from './item.service';

import { SharedModule } from '../../shared/shared.module';
import { ItemRoutingModule } from './item-routing.module';

@NgModule({
  declarations: [
    ItemMenuComponent,
    ItemComponent,
    ItemEditComponent,
    ItemListComponent,
    ItemListElementComponent,
    ItemDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ItemRoutingModule,
    SharedModule
  ],
  providers: [
    // ItemService,
  ]
})
export class ItemModule {}
