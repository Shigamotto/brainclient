import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

import { Category } from './category.model';
import { OAuthService } from '../../oauth/oauth.service';

@Injectable()
export class CategoryService {
  private cats: Category[] = [];
  private cat: Category = Category.EMPTY_MODEL;
  catsChanged = new Subject<Category[]>();
  catChose = new Subject<Category>();

  constructor(private router: Router,
              private http: HttpClient,
              private authService: OAuthService) {}

  setCategories(data: Category[]) {
    this.cats = data;
    this.catsChanged.next(this.cats.slice());
  }

  getCategories() {
    this.http.get<Category[]>('http://127.0.0.1:8000/api/items/cat/?format=json')
      .subscribe(
        (data: Category[]) => {
          this.setCategories(data);
      });
  }

  choseCategory(data: Category) {
    this.cat = data;
    this.catChose.next(this.cat);
  }

  getCategory(id: number): Observable<Category> {
    this.http.get<Category>('http://127.0.0.1:8000/api/items/cat/' + id + '/?format=json')
      .subscribe(
        (data: Category) => {
          this.choseCategory(data);
      });
    return this.catChose.asObservable();
  }

  editCat(id: number, cat: Category) {
    this.http.patch<Category>('http://127.0.0.1:8000/api/items/cat/' + id + '/?format=json',
      cat )
      .subscribe(
        res => { console.log(res); },
        err => { console.log(err); }
      );
  }

}
