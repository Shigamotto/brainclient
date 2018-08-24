import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

import { Item } from './item.model';
import { OAuthService } from '../../oauth/oauth.service';

@Injectable()
export class ItemService {
  private items: Item[] = [];
  private item: Item = Item.EMPTY_MODEL;
  ItemsChanged = new Subject<Item[]>();
  ItemChose = new Subject<Item>();

  constructor(private router: Router,
              private http: HttpClient,
              private authService: OAuthService) {}

  setItems(data: Item[]) {
    this.items = data;
    this.ItemsChanged.next(this.items.slice());
  }

  getItems() {
    this.http.get<Item[]>('http://127.0.0.1:8000/api/items/?format=json')
      .subscribe(
        (data: Item[]) => {
          this.setItems(data);
      });
  }

  choseItem(data: Item) {
    this.item = data;
    this.ItemChose.next(this.item);
  }

  getItem(id: number): Observable<Item> {
    this.http.get<Item>('http://127.0.0.1:8000/api/items/' + id + '/?format=json')
      .subscribe(
        (data: Item) => {
          this.choseItem(data);
      });
    return this.ItemChose.asObservable();
  }

}
