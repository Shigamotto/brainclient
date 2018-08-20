import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { OAuthSigninComponent } from './signin/signin.component';
import { OAuthSignupComponent } from './signup/signup.component';
import { OAuthRoutingModule } from './oauth-routing.module';

@NgModule({
  declarations: [
    OAuthSigninComponent,
    OAuthSignupComponent
  ],
  imports: [
    FormsModule,
    OAuthRoutingModule
  ],
  exports: [
    OAuthSigninComponent,
    OAuthSignupComponent
  ]
})
export class OAuthModule {}
