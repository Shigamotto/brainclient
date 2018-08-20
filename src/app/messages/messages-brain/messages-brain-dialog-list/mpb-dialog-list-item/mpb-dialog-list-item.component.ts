import { Component, OnInit, Input } from '@angular/core';

import { Dialog } from '../../../messages.model';

@Component({
  selector: 'mpb-dialog-list-item',
  templateUrl: 'mpb-dialog-list-item.component.html',
  styleUrls: ['mpb-dialog-list-item.component.css']
})
export class MBPDialogListItemComponent implements OnInit {
  @Input() dialog: Dialog;
  @Input() index: number;

  constructor() { }

  ngOnInit() { }

}
