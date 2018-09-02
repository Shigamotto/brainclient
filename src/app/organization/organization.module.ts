import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { OrganizationComponent } from './organization.component';
import { OrganizationService } from './organization.service';

import { SharedModule } from '../shared/shared.module';
import { OrganizationRoutingModule } from './organization-routing.module';

@NgModule({
  declarations: [
    OrganizationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrganizationRoutingModule,
    SharedModule
  ],
  providers: [
    OrganizationService,
  ]
})
export class OrganizationModule {}
