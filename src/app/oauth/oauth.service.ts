import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

import { SettingsService } from '../settings/settings.service';
import { Profile } from '../settings/settings.model';

@Injectable()
export class OAuthService {
  client_id = 'kz7GQel7wV9SAUD9FCSmYWvzkX9uj4tnkrze33ZO';
  client_secret = '7jA5Mxr2fRiq6NjSITV1MIEfN58XLyeLyWly5rm30FdbMZaz2adPJ0D17rOqagWpuYSZTMZvjbpLoXClFEvUfDR4XJlFAHhSaMdrenFRspYQm3dQbLWaxbesTPLaQxfl';
  access_token: string;
  refresh_token: string;
  error: string;
  public user: string; // Profile = Profile.EMPTY_MODEL

  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private http: HttpClient
  ) {
    if ( !this.access_token ) {
      if (localStorage.getItem('bpa_token') !== null) {
        const storage = JSON.parse(localStorage.getItem('bpa_token'));
        this.user = storage['username'];
        this.access_token = storage['access_token'];
        this.refresh_token = storage['refresh_token'];
      }
    }
  }

  signupUser(email: string, password: string) {

  }

  signinUser(email: string, password: string) {
    this.user = email;
    this.http.post('http://127.0.0.1:8000/api/oauth/token/',
      {
        'client_id': this.client_id,
        'client_secret': this.client_secret,
        'grant_type': 'password',
        'username': email,
        'password': password
      })
      .subscribe(
        data => {
          localStorage.setItem('bpa_token', JSON.stringify({
            username: email,
            access_token: data['access_token'],
            refresh_token: data['refresh_token']
          }));
          // localStorage.setItem('brainpark', JSON.stringify({refresh_token: data['refresh_token']}));
          this.access_token = data['access_token'];
          this.refresh_token = data['refresh_token'];
          this.router.navigate(['/projects/']);
          this.settingsService.getProfile();
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        });
  }

  logout() {
    localStorage.removeItem('bpa_token');
    this.access_token = null;
    this.refresh_token = null;
    this.user = null;
  }

  refreshToken(token: string = this.refresh_token) {
    console.log(token);
    this.http.post('http://127.0.0.1:8000/api/oauth/token/',
      {
        'client_id': this.client_id,
        'client_secret': this.client_secret,
        'grant_type': 'refresh_token',
        'refresh_token': token
      }, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
    .subscribe(
        data => {
          localStorage.setItem('bpa_token', JSON.stringify({
            access_token: data['access_token'],
            refresh_token: data['refresh_token']
          }));
          this.refresh_token = data['refresh_token'];
          this.access_token = data['access_token'];
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        });
  }

  getToken() {
    return this.access_token;
  }

  getUser() {
    return this.user;
  }

  isUser(user: string) {
    return this.user == user;
  }

  isAuthenticated() {
    return this.access_token != null;
  }
}
