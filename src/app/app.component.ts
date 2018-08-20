import { Component, OnInit } from '@angular/core';

import { OAuthService } from './oauth/oauth.service';
import { SettingsService } from './settings/settings.service';
import { HeaderService } from './core/header/header.service';
import { Profile } from './settings/settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public menuOpened = true;
  user: Profile = Profile.EMPTY_MODEL;

  constructor(
    private settingsService: SettingsService,
    private authService: OAuthService,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.authService.getUser();
    this.settingsService.profileChanged
      .subscribe(
        (profile) => {
          this.user = profile;
        }
      );
  }

  /*menuOpen(opened:boolean){
    this.menuOpened = this.menuOpened ? false : true;
  }*/


}
