import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OAuthGuard } from '../../oauth/oauth-guard.service';

import { ItemComponent } from './item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import {Item} from './item.model';

const ItemRoutes: Routes = [
  { path: '', component: ItemComponent, canActivate: [OAuthGuard], children: [
    { path: '', component: ItemListComponent },
    { path: 'new', component: ItemEditComponent },
    { path: ':id', component: ItemDetailComponent },
    { path: ':id/edit', component: ItemEditComponent },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(ItemRoutes)
  ],
  exports: [RouterModule],
  providers: [
    OAuthGuard
  ]
})
export class ItemRoutingModule {}
