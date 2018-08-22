import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import * as moment from 'moment';

import { BookSheet } from './bookkeeping.model';
import { OAuthService } from '../oauth/oauth.service';

@Injectable()
export class BookkeepingService {
  private bookSheets: BookSheet[] = [];
  private bookSheet: BookSheet;
  sheetChanged = new Subject<BookSheet[]>();
  sheetChose = new Subject<BookSheet>();

  constructor(private router: Router,
              private http: HttpClient,
              private authService: OAuthService) {}

  setBookSheets(bookSheets: BookSheet[]) {
    this.bookSheets = bookSheets;
    this.sheetChanged.next(this.bookSheets.slice());
  }

  getBookSheets() {
    this.http.get<BookSheet[]>('http://127.0.0.1:8000/api/bk/?format=json')
      .pipe(
        map((sheets: BookSheet[]) => {
          return sheets.map( (sheet: any) => {
            const oldDate = moment(sheet.date_pub);
            let newDate: string;
            if ( oldDate.isAfter(new Date(), 'day') ) {
              newDate = oldDate.format('DD MMM');
            } else if ( oldDate.isAfter(new Date(), 'year') ) {
              newDate = oldDate.format('HH:mm'); } else { newDate = oldDate.format('DD MMM YY');
            }
            return new BookSheet(sheet.pk, sheet.title, sheet.simple, sheet.desc, newDate, sheet.amount,
              sheet.created_by, sheet.status_pay, sheet.status_get, sheet.lines, sheet.status_history, sheet.from, sheet.to,
              sheet.warehouse, sheet.refers, sheet.attach);
          });
        })
      )
      .subscribe(
        (sheets: BookSheet[]) => {
          this.setBookSheets(sheets);
      });
  }

  setBookSheet(bookSheet: BookSheet) {
    this.bookSheet = bookSheet;
    this.sheetChose.next(this.bookSheet);
  }

  getBookSheet(id: number): Observable<BookSheet> {
    this.http.get<BookSheet>('http://127.0.0.1:8000/api/bk/' + id + '/?format=json')
      .pipe(
        map((sheet: any) => {
            const oldDate = moment(sheet.date_pub);
            let newDate: string;
            if ( oldDate.isAfter(new Date(), 'day') ) {
              newDate = oldDate.format('DD MMM');
            } else if ( oldDate.isAfter(new Date(), 'year') ) {
              newDate = oldDate.format('HH:mm');
            } else { newDate = oldDate.format('DD MMM YY'); }
            return new BookSheet(sheet.pk, sheet.title, sheet.simple, sheet.desc, newDate, sheet.amount,
              sheet.created_by, sheet.status_pay, sheet.status_get, sheet.lines, sheet.status_history, sheet.from, sheet.to,
              sheet.warehouse, sheet.refers, sheet.attach);
        })
      )
      .subscribe(
        (sheet: BookSheet) => {
          this.setBookSheet(sheet);
      });
    return this.sheetChose.asObservable();
  }

  createBookSheet(booksheet: BookSheet) {
    this.http.post('http://127.0.0.1:8000/api/bk/create/',
      booksheet )
      .subscribe(
        res => { console.log(res); },
        err => { console.log(err); }
      );
  }

  editBookSheet(id: number, booksheet: BookSheet) {
    console.log(booksheet);
    this.http.patch('http://127.0.0.1:8000/api/bk/' + id + '/?format=json',
       booksheet )
       .subscribe(
         res => { console.log(res); },
         err => { console.log(err); }
       );
  }

  deleteBookSheet(id: number) {
    this.http.delete('http://127.0.0.1:8000/api/bk/' + id + '/')
      .subscribe(
        res => { console.log(res); },
        err => { console.log(err); }
      );
  }

  clearBookSheet() {
    // this.sheetChose = new Subject<BookSheet>();
  }

}
