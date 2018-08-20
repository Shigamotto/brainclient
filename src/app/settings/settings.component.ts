import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { SettingsService } from './settings.service';
import { Profile } from './settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profile: Profile;
  subscription: Subscription;

  constructor(
    private settingsService: SettingsService,
    private http:HttpClient
  ) {}

  ngOnInit() {}

}
