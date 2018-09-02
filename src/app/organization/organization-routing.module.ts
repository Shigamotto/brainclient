import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OAuthGuard } from '../oauth/oauth-guard.service';

import { OrganizationComponent } from './organization.component';
// import { ItemListComponent } from './item-list/item-list.component';
// import { ItemDetailComponent } from './item-detail/item-detail.component';
// import { ItemEditComponent } from './item-edit/item-edit.component';
// import {Item} from './item.model';

const CategoryRoutes: Routes = [
  { path: '', component: OrganizationComponent, canActivate: [OAuthGuard], children: [
    // { path: '', component: ItemListComponent },
    // { path: 'new', component: ItemEditComponent },
    // { path: ':id', component: ItemDetailComponent },
    // { path: ':id/edit', component: ItemEditComponent },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(CategoryRoutes)
  ],
  exports: [RouterModule],
  providers: [
    OAuthGuard
  ]
})
export class OrganizationRoutingModule {}
