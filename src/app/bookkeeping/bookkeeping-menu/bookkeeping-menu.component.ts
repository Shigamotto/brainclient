import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookkeeping-menu',
  templateUrl: './bookkeeping-menu.component.html',
  styleUrls: ['./bookkeeping-menu.component.css']
})
export class BookkeepingMenuComponent implements OnInit {
  private id:number = 1;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  onEdit() {
    this.router.navigate(['edit'],{ relativeTo: this.route })
  }

  ngOnDestroy() {
  }

}
