import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OAuthGuard } from '../../oauth/oauth-guard.service';

import { BOMComponent } from './bom.component';
import { BOMListComponent } from './bom-list/bom-list.component';
import { BOMDetailComponent } from './bom-detail/bom-detail.component';
import { BOMEditComponent } from './bom-edit/bom-edit.component';

const BOMRoutes: Routes = [
  { path: '', component: BOMComponent, canActivate: [OAuthGuard], children: [
    { path: '', component: BOMListComponent },
    { path: 'new', component: BOMEditComponent },
    { path: ':id', component: BOMDetailComponent },
    { path: ':id/edit', component: BOMEditComponent },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(BOMRoutes)
  ],
  exports: [RouterModule],
  providers: [
    OAuthGuard
  ]
})
export class BOMRoutingModule {}
