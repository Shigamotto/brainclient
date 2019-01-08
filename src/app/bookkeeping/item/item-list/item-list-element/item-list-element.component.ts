import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Item } from '../../item.model';
import {ItemService} from '../../item.service';

@Component({
  selector: 'app-item-list-element',
  templateUrl: './item-list-element.component.html',
  styleUrls: ['./item-list-element.component.css']
})
export class ItemListElementComponent implements OnInit {
  @Input() item: Item;
  @Input() index: number;
  private checked = false;
  private clicked = false;
  private picIsOpen = false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private itemService: ItemService) { }

  ngOnInit() { }

  onClick() {
    if (!this.clicked && (this.item.desc || this.item.attribute )) {
      this.clicked = true;
    } else {
      const calling_id = this.item.id ? this.item.id : this.index;
      // this.router.navigate([{outlets: {booksheet: [this.sheet.id, 'edit']}}]);
      // this.router.navigate([{outlets: {booksheet: ['bk', 'new']}}], {relativeTo: this.route});
      this.router.navigate(['bk', 'item', calling_id]);
    }
  }
  onClose() { this.clicked = false; }

  onToggle() {
    this.checked = !this.checked;
    this.itemService.onCheckBoxChange({
      'id': this.item.id,
      'checked': this.checked
    });
  }

  openPicture() {
    if (this.item.images.length > 0 ) {
      this.picIsOpen = !this.picIsOpen;
    }
  }
}
