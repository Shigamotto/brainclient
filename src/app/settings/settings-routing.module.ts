import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent }   from './settings.component';
import { SettingsProfileComponent }   from './profile/settings-profile.component';
import { SettingsLtdComponent } from './ltd/settings-ltd.component';

const SettingsRoutes: Routes = [
  { path: '', component: SettingsComponent , children: [
    { path: '', component: SettingsProfileComponent },
    { path: 'l', component: SettingsLtdComponent },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(SettingsRoutes)
  ],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
