import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { Item } from '../../item.model';

@Component({
  selector: 'app-item-list-element',
  templateUrl: './item-list-element.component.html',
  styleUrls: ['./item-list-element.component.css']
})
export class ItemListElementComponent implements OnInit {
  @Input() item: Item;
  @Input() index: number;
  private clicked = false;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  onClick() {
    if (!this.clicked) {
      this.clicked = true;
    } else {
      const calling_id = this.item.id ? this.item.id : this.index;
      // this.router.navigate([{outlets: {booksheet: [this.sheet.id, 'edit']}}]);
      // this.router.navigate([{outlets: {booksheet: ['bk', 'new']}}], {relativeTo: this.route});
      this.router.navigate(['bk', 'item', calling_id]);
    }
  }
  onClose() { this.clicked = false; }

}
