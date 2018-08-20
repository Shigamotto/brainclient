import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Profile } from '../settings.model';
import { SettingsService} from '../settings.service';

@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings-profile.component.html',
  styleUrls: ['./settings-profile.component.css']
})
export class SettingsProfileComponent implements OnInit {
  public profile:Profile = Profile.EMPTY_MODEL;
  profileForm: FormGroup;
  subscription: Subscription;
  private avatarView: string = 'normal';

  constructor(
    private settingsService: SettingsService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.settingsService.getProfileSettings();
    this.subscription = this.settingsService.profileChanged
      .subscribe(
        (profile) => {
          this.profile = profile;
          this.profileForm.patchValue({
            'username': profile.username,
            'first_name': profile.first_name,
            'last_name': profile.last_name,
            'image': profile.image,
          });
          if (profile['organization']) {
            for (let organization of profile.organization) {
              (<FormArray>this.profileForm.controls['organizations']).push(
                new FormGroup({
                  'name': new FormControl(organization.name),
                  'id': new FormControl(organization.id),
                  'group': new FormControl(organization.groups),
                })
              );
            }
          }
          if (profile['mailboxes']) {
            for (let box of profile.mailboxes) {
              (<FormArray>this.profileForm.controls['mailboxes']).push(
                new FormGroup({
                  'boxuser': new FormControl(box.boxuser),
                  'boxpass': new FormControl(box.boxpass),
                  'boxtype': new FormControl(box.boxtype),
                  'boxserv': new FormControl(box.boxserv),
                  'boxfetch': new FormControl(box.boxfetch)
                })
              );
            }
          }
        });
  }

  private initForm(){
    let profileUsername = this.profile.username;
    let profileFirstName = this.profile.first_name;
    let profileLastName = this.profile.last_name;
    let profileImage = this.profile.image;
    let profileOrganizations = new FormArray([]);
    let profileMailboxes = new FormArray([]);

    this.profileForm = new FormGroup({
      'username': new FormControl(profileUsername, Validators.required),
      'first_name': new FormControl(profileFirstName, Validators.required),
      'last_name': new FormControl(profileLastName, Validators.required),
      'image': new FormControl(profileImage, Validators.required),
      'organizations': profileOrganizations,
      'mailboxes': profileMailboxes
    });
  }

  private addNewMailbox() {
    (<FormArray>this.profileForm.controls['mailboxes']).push(
      new FormGroup({
        'boxuser': new FormControl(""),
        'boxpass': new FormControl(""),
        'boxtype': new FormControl(""),
        'boxserv': new FormControl(""),
        'boxfetch': new FormControl("")
      })
    );
  }

  private addNewOrganization() {
    (<FormArray>this.profileForm.controls['organizations']).push(
      new FormGroup({
        'name': new FormControl(""),
        'id': new FormControl(""),
        'groups': new FormControl(""),
      })
    );
  }

  private changeAvatarView(viewMode:string) {
    this.avatarView = viewMode;
  }

}
