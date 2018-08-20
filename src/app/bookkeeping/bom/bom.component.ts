import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bom',
  templateUrl: './bom.component.html',
  styleUrls: ['./bom.component.css']
})
export class BOMComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    console.log('Loading BOM...');
  }

}
