import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OAuthGuard } from '../../oauth/oauth-guard.service';

import { WarehouseComponent } from './warehouse.component';
import { WarehouseDetailComponent } from './warehouse-detail/warehouse-detail.component';
import { WarehouseSettingsComponent } from './warehouse-settings/warehouse-settings.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';

const warehouseRoutes: Routes = [
  { path: '', component: WarehouseComponent, canActivate: [OAuthGuard], children: [
    { path: '', component: WarehouseListComponent },
    { path: 'new', component: WarehouseSettingsComponent },
    { path: ':id', component: WarehouseDetailComponent },
    { path: ':id/edit', component: WarehouseSettingsComponent },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(warehouseRoutes)
  ],
  exports: [RouterModule],
  providers: [
    OAuthGuard
  ]
})
export class WarehouseRoutingModule {}
