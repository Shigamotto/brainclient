import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import * as moment from 'moment';

import { Warehouse } from './warehouse.model';
import { OAuthService } from '../../oauth/oauth.service';

@Injectable()
export class WarehouseService {
  private warehouses: Warehouse[] = [];
  private warehouse: Warehouse = Warehouse.EMPTY_MODEL;
  WHChanged = new Subject<Warehouse[]>();
  WHChose = new Subject<Warehouse>();

  constructor(private router: Router,
              private http:HttpClient,
              private authService:OAuthService) {}

  setWarehouses(data: Warehouse[]) {
    this.warehouses = data;
    this.WHChanged.next(this.warehouses.slice());
  }

  getWarehouses() {
    this.http.get<Warehouse[]>('http://127.0.0.1:8000/api/bk/wh/?format=json')
      .subscribe(
        (data: Warehouse[]) => {
          this.setWarehouses(data);
      });
  };

  choseWarehouse(data: Warehouse) {
    this.warehouse = data;
    this.WHChose.next(this.warehouse);
  }

  getWarehouse(id:number): Observable<Warehouse> {
    this.http.get<Warehouse>('http://127.0.0.1:8000/api/bk/wh/' + id + '/?format=json')
      .subscribe(
        (data: Warehouse) => {
          this.choseWarehouse(data);
      });
    return this.WHChose.asObservable();
  }

}
