import { Component } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  RoutesRecognized,
  ActivationStart,
  ActivationEnd,
  ChildActivationStart,
  ActivatedRoute
} from '@angular/router';

import { Subscription } from 'rxjs';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-header-shared',
  templateUrl: './header-shared.component.html',
  styleUrls: ['./header-shared.component.css']
})
export class HeaderSharedComponent {
  locationValue;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {
    _router.events.forEach((event) => {
      // console.log(event)
      if(event instanceof ChildActivationStart) {
        // console.log('ChildAct', event)
      } else if(event instanceof ActivationStart) {
        // console.log('ActST ', event)
      }
      /*if(event instanceof NavigationStart) {
        console.log(event)
      } else if(event instanceof NavigationEnd) {
        console.log('NavEND ', event)
      } else if(event instanceof NavigationCancel) {
        console.log('NavCANCEL ', event)
      } else if(event instanceof NavigationError) {
        console.log('NavERROR ', event)
      } else if(event instanceof RoutesRecognized) {
        console.log('NavRECOGNIZE ', event)
      }*/
    });
  }

  ngOnInit() {
    // this._router.events.subscribe((val) => {console.log(val)});
  }

}
