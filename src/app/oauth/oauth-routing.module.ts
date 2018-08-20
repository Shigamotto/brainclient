import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OAuthSignupComponent } from './signup/signup.component';
import { OAuthSigninComponent } from './signin/signin.component';

const authRoutes: Routes = [
  { path: 'signup', component: OAuthSignupComponent },
  { path: 'signin', component: OAuthSigninComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class OAuthRoutingModule {

}
