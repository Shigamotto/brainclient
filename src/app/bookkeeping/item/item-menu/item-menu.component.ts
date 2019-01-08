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
  private isDetailOrEdit = false;
  private isDeleted = false;
  private isEdit = false;
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
    this.isDetailOrEdit = true;
    this.isDeleted = false;
    this.idChose.next(this.id);
  }

  onRefresh() {
    if (this.isDetailOrEdit && this.id !== 0) {
      this.itemService.getItem(this.id);
    } else {
      this.itemService.getItems();
    }
  }

  onEdit() {
    this.isEdit = true;
    this.router.navigate([this.id, 'edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.itemService.removeItem(this.id);
    this.isDetailOrEdit = false;
    this.isDeleted = true;
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  onBackToList() {
    this.isDetailOrEdit = false;
    this.router.navigate(['./'],{ relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
