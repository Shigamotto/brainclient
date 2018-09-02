import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

import { Organization } from './organization.model';
import { OAuthService } from '../oauth/oauth.service';

@Injectable()
export class OrganizationService {
  private orgs: Organization[] = [];
  private org: Organization = Organization.EMPTY_MODEL;
  orgsChanged = new Subject<Organization[]>();
  orgChose = new Subject<Organization>();

  constructor(private router: Router,
              private http: HttpClient,
              private authService: OAuthService) {}

  setOrganizations(data: Organization[]) {
    this.orgs = data;
    this.orgsChanged.next(this.orgs.slice());
  }

  getOrganizations() {
    this.http.get<Organization[]>('http://127.0.0.1:8000/api/o/?format=json')
      .subscribe(
        (data: Organization[]) => {
          this.setOrganizations(data);
      });
  }

  choseOrganization(data: Organization) {
    this.org = data;
    this.orgChose.next(this.org);
  }

  getOrganization(id: number): Observable<Organization> {
    this.http.get<Organization>('http://127.0.0.1:8000/api/o/' + id + '/?format=json')
      .subscribe(
        (data: Organization) => {
          this.choseOrganization(data);
      });
    return this.orgChose.asObservable();
  }

  editOrganization(id: number, org: Organization) {
    this.http.patch<Organization>('http://127.0.0.1:8000/api/o/' + id + '/?format=json',
      org )
      .subscribe(
        res => { console.log(res); },
        err => { console.log(err); }
      );
  }

}
