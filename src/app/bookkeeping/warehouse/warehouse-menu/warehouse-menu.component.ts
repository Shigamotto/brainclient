import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-warehouse-menu',
  templateUrl: './warehouse-menu.component.html',
  styleUrls: ['./warehouse-menu.component.css']
})
export class WarehouseMenuComponent implements OnInit {
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
