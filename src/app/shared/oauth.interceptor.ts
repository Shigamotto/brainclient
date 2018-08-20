import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
// import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
// HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';

import { map, tap, catchError } from 'rxjs/operators';

// import 'rxjs/add/operator/do';
// import "rxjs/add/operator/catch";
// import 'rxjs/add/observable/throw';

import { OAuthService } from '../oauth/oauth.service';

@Injectable()
export class OAuthInterceptor implements HttpInterceptor {
  isRefresh = false;

  constructor(private injector: Injector, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('Intercepted!', req);

    if (req.url == ''){

    }

    let auth = this.injector.get(OAuthService);
    const token = auth.getToken();
    const copiedReq = !auth.isAuthenticated()?req:req.clone({
      headers: req.headers.set('Authorization','Bearer ' + token)
    });
    return next.handle(copiedReq).pipe(
      tap((res) => {
        if (res instanceof HttpErrorResponse) {
          if (res.status === 401 || res.status === 403) {
            if ( !this.isRefresh ) {
              this.isRefresh = true;
              auth.refreshToken();
            } else {
              // auth.logout();
              this.router.navigate(['/signin/']);
            }
            const token = auth.getToken();
            const copiedReq = !auth.isAuthenticated()?req:req.clone({
                headers: req.headers.set('Authorization','Bearer ' + token)
              });
            return next.handle(copiedReq)
          } else {
            // auth.logout();
            this.router.navigate(['/signin/']);
          }
          throw new Error('Valid token not returned');
          // return Observable.throw(res);
        }
      }))
  };

}
