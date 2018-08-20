import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OAuthGuard } from '../oauth/oauth-guard.service';

import { BookkeepingComponent } from './bookkeeping.component';
import { BookkeepingDetailComponent } from './bookkeeping-detail/bookkeeping-detail.component';
import { BookkeepingEditComponent } from './bookkeeping-edit/bookkeeping-edit.component';
import { BookkeepingListComponent } from './bookkeeping-list/bookkeeping-list.component';

const projectsRoutes: Routes = [
  { path: '', component: BookkeepingComponent, canActivate: [OAuthGuard], children: [
    { path: '', redirectTo: 'list'},
    { path: 'list', component: BookkeepingListComponent },
    { path: 'wh', loadChildren: './warehouse/warehouse.module#WarehouseModule' },
    { path: 'bom', loadChildren: './bom/bom.module#BOMModule' },
    { path: 'new', component: BookkeepingEditComponent },
    { path: ':id', component: BookkeepingDetailComponent },
    { path: ':id/edit', component: BookkeepingEditComponent },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes)
  ],
  exports: [RouterModule],
  providers: [
    OAuthGuard
  ]
})
export class BookkeepingRoutingModule {}
