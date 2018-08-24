import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {PromoComponent} from './promo/promo.component';
import { OAuthSignupComponent } from './oauth/signup/signup.component';
import { OAuthSigninComponent } from './oauth/signin/signin.component';
import { SearchComponent } from './core/search/search.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  // { path: '', component: PromoComponent, pathMatch: 'full' },
  { path: 'search', component: SearchComponent, outlet: 'search' },
  { path: 'signin', component: OAuthSigninComponent },
  { path: 'signup', component: OAuthSignupComponent },
  { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule' },
  { path: 'bk', loadChildren: './bookkeeping/bookkeeping.module#BookkeepingModule'},
  { path: 'messages', loadChildren: './messages/messages.module#MessagesModule'},
  { path: 'settings', loadChildren: './settings/settings.module#SettingsModule'},
  { path: 'friends', loadChildren: './friends/friends.module#FriendsModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
