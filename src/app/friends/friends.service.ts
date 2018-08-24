import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import * as moment from 'moment';

import { Friend } from './friend.model';
import { OAuthService } from '../oauth/oauth.service';

@Injectable()
export class FriendsService {
  private warehouses: Friend[] = [];
  private warehouse: Friend = Friend.EMPTY_MODEL;
  WHChanged = new Subject<Friend[]>();
  WHChose = new Subject<Friend>();

  constructor(private router: Router,
              private http: HttpClient,
              private authService: OAuthService) {}

  setWarehouses(data: Friend[]) {
    this.warehouses = data;
    this.WHChanged.next(this.warehouses.slice());
  }

  getWarehouses() {
    this.http.get<Friend[]>('http://127.0.0.1:8000/api/bk/wh/?format=json')
      .subscribe(
        (data: Friend[]) => {
          this.setWarehouses(data);
      });
  };

  choseWarehouse(data: Friend) {
    this.warehouse = data;
    this.WHChose.next(this.warehouse);
  }

  getWarehouse(id:number): Observable<Friend> {
    this.http.get<Friend>('http://127.0.0.1:8000/api/bk/wh/' + id + '/?format=json')
      .subscribe(
        (data: Friend) => {
          this.choseWarehouse(data);
      });
    return this.WHChose.asObservable();
  }

}
