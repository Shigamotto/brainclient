import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Item} from '../item.model';
import {ItemService} from '../item.service';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.css']
})
export class ItemMenuComponent implements OnInit, OnDestroy {
  private id: number;
  public idChose = new Subject<number>();

  subscription: Subscription;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscription = this.itemService.ItemChose.subscribe( (data: Item) => {
      this.setId(data.id);
    });
  }

  setId(id: number) {
    this.id = id;
    this.idChose.next(this.id);
  }

  onEdit() {
    this.router.navigate(['edit'],{ relativeTo: this.route })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
