import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bom-menu',
  templateUrl: './bom-menu.component.html',
  styleUrls: ['./bom-menu.component.css']
})
export class BOMMenuComponent implements OnInit {
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
