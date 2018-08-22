import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BookkeepingComponent } from './bookkeeping.component';
import { BookkeepingMenuComponent } from './bookkeeping-menu/bookkeeping-menu.component';
import { BookkeepingDetailComponent } from './bookkeeping-detail/bookkeeping-detail.component';
import { BookkeepingEditComponent } from './bookkeeping-edit/bookkeeping-edit.component';
import { BookkeepingListComponent } from './bookkeeping-list/bookkeeping-list.component';
import { BookkeepingListItemComponent } from './bookkeeping-list/bookkeeping-list-item/bookkeeping-list-item.component';
import { BookkeepingService } from './bookkeeping.service';
import {WarehouseService} from './warehouse/warehouse.service';

// import { HeaderBKComponent } from './header-bookkeeping/header.bk.component';

import { SharedModule } from '../shared/shared.module';
import { BookkeepingRoutingModule } from './bookkeeping-routing.module';

@NgModule({
  declarations: [
    BookkeepingComponent,
    BookkeepingMenuComponent,
    BookkeepingDetailComponent,
    BookkeepingEditComponent,
    BookkeepingListComponent,
    BookkeepingListItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookkeepingRoutingModule,
    SharedModule
  ],
  providers: [
    BookkeepingService,
    WarehouseService,
    // LinkService,
  ]
})
export class BookkeepingModule {}
