import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import * as moment from 'moment';

import { BOM } from './bom.model';
import { OAuthService } from '../../oauth/oauth.service';
import {Item} from '../item/item.model';

@Injectable()
export class BOMService {
  private boms: BOM[] = [];
  private bom: BOM = BOM.EMPTY_MODEL;
  BOMsChanged = new Subject<BOM[]>();
  BOMChose = new Subject<BOM>();

  constructor(private router: Router,
              private http: HttpClient,
              private authService: OAuthService) {}

  setBOMs(data: BOM[]) {
    this.boms = data;
    this.BOMsChanged.next(this.boms.slice());
  }

  getBOMs() {
    this.http.get<BOM[]>('http://127.0.0.1:8000/api/items/bom/?format=json')
      .subscribe(
        (data: BOM[]) => {
          this.setBOMs(data);
      });
  }

  choseBOM(data: BOM) {
    this.bom = data;
    this.BOMChose.next(this.bom);
  }

  getBOM(id: number): Observable<BOM> {
    this.http.get<BOM>('http://127.0.0.1:8000/api/items/bom/' + id + '/?format=json')
      .subscribe(
        (data: BOM) => {
          this.choseBOM(data);
      });
    return this.BOMChose.asObservable();
  }

  editBOM(id: number, data: BOM) {
    console.log(data);
    return this.http.patch<BOM>('http://127.0.0.1:8000/api/items/bom/' + id + '/?format=json',
      data );
  }

  addBOM(data: BOM) {
    console.log(data);
    return this.http.patch<BOM>('http://127.0.0.1:8000/api/items/bom/create/?format=json',
      data );
  }
}
