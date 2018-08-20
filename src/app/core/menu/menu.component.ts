import { Component, Output, EventEmitter } from '@angular/core';

import { Profile } from '../../settings/settings.model';

import { OAuthService } from '../../oauth/oauth.service';
import { SettingsService } from '../../settings/settings.service';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Output() onOpen = new EventEmitter<boolean>();

  private menuOpen:boolean = true;
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
        (profile)=>{
          console.log(profile);
          this.user = profile;
        }
      )
  };

  onLogout() {
    this.authService.logout();
  }

  onToggleMenu() {
    this.headerService.menuOpen();
  }

}
