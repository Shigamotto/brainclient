import { Component } from '@angular/core';
import { ClockService } from './clock.service';
import { OAuthService } from '../../oauth/oauth.service';
import { HeaderService } from './header.service';
import { SettingsService } from '../../settings/settings.service'
import { Profile } from '../../settings/settings.model';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private profile:Profile = Profile.EMPTY_MODEL;
  private choseLTD = false;

  inputVal: string = '';
  time: Date;
  subscription: Subscription;

  widget:string;
  status:string;
  attach:{};

  constructor(
    private headService: HeaderService,
    private settingsService: SettingsService,
    private clockService: ClockService
  ) {}

  ngOnInit() {
    this.settingsService.getProfile();
    this.settingsService.profileChanged.subscribe(profile => { this.profile = profile});
    // this.clockService.getClock().subscribe(time => {this.time = time;});
    this.headService.statusChanged.subscribe(status => {this.status = status});
    this.headService.widgetChanged.subscribe(widget => {this.widget = widget});
  }

  toggleChoseLTD() { this.choseLTD = !this.choseLTD };

  ChoseLTD(id:string) {
    this.settingsService.choseLTDMode(id);
    this.toggleChoseLTD();
  }

  makeMail() {console.log('001')}
  makeBooksheet() {console.log('002')}
  makeTask() {console.log('003')}
  makeSearch() {console.log('004')}

}
