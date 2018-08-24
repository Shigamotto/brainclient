import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

import { Profile } from './settings.model';

@Injectable()
export class SettingsService {
  public profile: Profile;
  public profileChanged = new Subject<Profile>();
  token: string;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  setProfile(profile: Profile) {
    this.profile = profile;
    this.profileChanged.next(this.profile);
  }

  getProfile() {
    this.http.get<Profile>('http://127.0.0.1:8000/api/u/?format=json')
      .subscribe(
        (profile: Profile) => {
          this.setProfile(profile);
      });
  }

  getProfileSettings() {
    this.http.get<Profile>('http://127.0.0.1:8000/api/u/set/?format=json')
      .subscribe(
        (profile: Profile) => {
          this.setProfile(profile);
      });
  }

  editProfile(id: number, title: string, start: string, end: string) {
    this.http.put('http://127.0.0.1:8000/api/task/' + id + '/edit/',
      {title: title, date_start: start, date_end: end} )
      .subscribe(
        res => { console.log(res); },
        err => { console.log(err); }
      );
  }

  toggleLTDMode() {
    // if(!this.profile){this.getProfile(){};
    this.profile.ltdmode = !this.profile.ltdmode;
    if (this.profile.ltdmode) {
      this.profile.chose_organization = this.profile.organization[0].id;
      console.log(this.profile.chose_organization);
    }
    this.setProfile(this.profile);
  }

  choseLTDMode(id: string) {
    this.profile.chose_organization = id;
    this.setProfile(this.profile);
  }

  addOrganization() {}
  editOrganization() {}
  deleteOrganization() {}

  addMailbox() {}
  editMailbox() {}
  deleteMailbox() {}

}
