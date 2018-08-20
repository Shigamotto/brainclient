import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class HeaderService {
  public menuOpened = true;

  statusChanged = new Subject<string>();
  alphaStatusChanged = new Subject<any>();
  widgetChanged = new Subject<string>();
  alphaWidgetChanged = new Subject<any>();
  attachChanged = new Subject<{}>();

  private status:string;
  public alphaStatus: {}[];
  private widget:string;
  public alphaWidget:{}[];
  private attach:{};

  constructor() {}

  menuOpen() {
    this.menuOpened = this.menuOpened ? false : true;
  }

  setStatus(status) {
    this.status = status;
    this.statusChanged.next(this.status);
  }

  setAlphaStatus(status: {}[]) {
    this.alphaStatus = status;
    this.alphaStatusChanged.next(this.status);
  }

  setWidget(widget) {
    this.widget = widget;
    this.widgetChanged.next(this.widget);
  }
  setAlphaWidget(widget: {}[]) {
    this.alphaWidget = widget;
    this.alphaWidgetChanged.next(this.widget.slice());
  }

  setAttach(attach: {}) {
    this.attach = attach;
    this.attachChanged.next(this.attach);
  };

}
