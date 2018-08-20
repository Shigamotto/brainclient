import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BOMComponent } from './bom.component';
import { BOMListComponent } from './bom-list/bom-list.component';
import { BOMDetailComponent } from './bom-detail/bom-detail.component';
import { BOMDetailMaterialComponent } from './bom-detail/bom-detail-material/bom-detail-material.component';
import { BOMEditComponent } from './bom-edit/bom-edit.component';
import { BOMEditMaterialComponent } from './bom-edit/bom-edit-material/bom-edit-material.component';
import { BOMMenuComponent } from './bom-menu/bom-menu.component';

import { BOMService } from './bom.service';

// import { HeaderBOMComponent } from './header-bom/header.bom.component';

import { SharedModule } from '../../shared/shared.module';
import { BOMRoutingModule } from './bom-routing.module';

@NgModule({
  declarations: [
    BOMComponent,
    BOMListComponent,
    BOMDetailComponent,
    BOMDetailMaterialComponent,
    BOMEditComponent,
    BOMEditMaterialComponent,
    BOMMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BOMRoutingModule,
    SharedModule
  ],
  providers: [
    BOMService,
  ]
})
export class BOMModule {}
