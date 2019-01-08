import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
// import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
// HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';

import { map, tap, catchError, switchMap } from 'rxjs/operators';

import { OAuthService } from '../oauth/oauth.service';

@Injectable()
export class OAuthInterceptor implements HttpInterceptor {
  private isRefresh = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  // private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
  //   null
  // );

  constructor(private injector: Injector, private router: Router, private authService: OAuthService) {}

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }});
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('Intercepted!', req);
    if (req.url === '') {}

    const auth = this.injector.get(OAuthService);
    const token = auth.getToken();
    const copiedReq = !auth.isAuthenticated() ? req : req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    return next.handle(copiedReq).pipe(
      // catchError( (error) => {
      //   console.log(error);
      //   if (error instanceof HttpErrorResponse) {
      //     switch ((<HttpErrorResponse>error).status) {
      //       case 400:
      //         return this.handle400Error(error);
      //       case 401:
      //         return this.handle401Error(req, next);
      //     }
      //   } else {
      //     return Observable.throw(error);
      //   }
      // }),
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
            const access_token = auth.getToken();
            const copied_req = !auth.isAuthenticated() ? req : req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + access_token)
              });
            return next.handle(copied_req);
          } else {
            // auth.logout();
            this.router.navigate(['/signin/']);
          }
          throw new Error('Valid token not returned');
          // return Observable.throw(res);
        }
      })
    );
  }

  // // TOKENS
  // //
  // addAuthenticationToken(request) {
  //   // Get access token from Local Storage
  //   const accessToken = this.authService.getToken();
  //
  //   // If access token is null this means that user is not logged in
  //   // And we return the original request
  //   if (!accessToken) {
  //     return request;
  //   }
  //
  //   // We clone the request, because the original request is immutable
  //   return request.clone({
  //     setHeaders: {
  //       Authorization: this.authService.getToken()
  //     }
  //   });
  // }
  //
  // handle400Error(error) {
  //   if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
  //     // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
  //     return this.logoutUser();
  //   }
  //
  //   return Observable.throw(error);
  // }
  //
  // handle401Error(req: HttpRequest<any>, next: HttpHandler) {
  //   if (!this.isRefresh) {
  //     this.isRefresh = true;
  //
  //     // Reset here so that the following requests wait until the token
  //     // comes back from the refreshToken call.
  //     this.tokenSubject.next(null);
  //
  //     return this.authService.refreshToken()
  //       .switchMap((newToken: string) => {
  //         if (newToken) {
  //           this.tokenSubject.next(newToken);
  //           return next.handle(this.addToken(this.getNewRequest(req), newToken));
  //         }
  //
  //         // If we don't get a new token, we are in trouble so logout.
  //         return this.logoutUser();
  //       })
  //       .catch(error => {
  //         // If there is an exception calling 'refreshToken', bad news so logout.
  //         return this.logoutUser();
  //       })
  //       .finally(() => {
  //         this.isRefresh = false;
  //       });
  //   } else {
  //     return this.tokenSubject
  //       .filter(token => token != null)
  //       .take(1)
  //       .switchMap(token => {
  //         return next.handle(this.addToken(this.getNewRequest(req), token));
  //       });
  //   }
  // }
  //
  // /*
  //     This method is only here so the example works.
  //     Do not include in your code, just use 'req' instead of 'this.getNewRequest(req)'.
  // */
  // getNewRequest(req: HttpRequest<any>): HttpRequest<any> {
  //   if (req.url.indexOf('getData') > 0) {
  //     return new HttpRequest('GET', 'http://private-4002d-testerrorresponses.apiary-mock.com/getData');
  //   }
  //
  //   return new HttpRequest('GET', 'http://private-4002d-testerrorresponses.apiary-mock.com/getLookup');
  // }
  //
  // logoutUser() {
  //   // Route to the login page (implementation up to you)
  //
  //   return Observable.throw("");
  // }
}
