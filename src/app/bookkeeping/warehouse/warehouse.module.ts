import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { WarehouseComponent } from './warehouse.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { WarehouseDetailComponent } from './warehouse-detail/warehouse-detail.component';
import { WarehouseSettingsComponent } from './warehouse-settings/warehouse-settings.component';
import { WarehouseMenuComponent } from './warehouse-menu/warehouse-menu.component';

import { WarehouseService } from './warehouse.service';

// import { HeaderBKComponent } from './header-bookkeeping/header.bk.component';

import { SharedModule } from '../../shared/shared.module';
import { WarehouseRoutingModule } from './warehouse-routing.module';

@NgModule({
  declarations: [
    WarehouseComponent,
    WarehouseListComponent,
    WarehouseDetailComponent,
    WarehouseMenuComponent,
    WarehouseSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WarehouseRoutingModule,
    SharedModule
  ],
  providers: [
    WarehouseService,
    // LinkService,
  ]
})
export class WarehouseModule {}
