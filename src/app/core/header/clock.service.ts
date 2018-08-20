import {Injectable} from "@angular/core";
import {Observable, interval, Subscription  } from "rxjs";

@Injectable()
export class ClockService {

  private clock: Subscription;

  constructor() {
    this.clock = interval(1000).subscribe(tick => new Date());
  }

  // getClock(): Observable<Date> {
  //   return this.clock;
  // }

}
