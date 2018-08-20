import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// import { HomeComponent } from './home/home.component';
// import { PromoComponent } from './promo/promo.component';
// import { PromoMenuComponent } from './promo/promo-menu/promo-menu.component';

import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { OAuthModule } from './oauth/oauth.module'
import { CoreModule } from './core/core.module';
// import { DeskModule } from './core/desk/desk.module';

@NgModule({
  declarations: [
    // SearchComponent,
    // PromoComponent,
    // PromoMenuComponent,
    // HomeComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // AppRoutingModule,
    SharedModule,
    OAuthModule,
    CoreModule,
    // DeskModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
