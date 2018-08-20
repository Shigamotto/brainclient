import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './bom.component.html',
  styleUrls: ['./bom.component.css']
})
export class ItemComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    console.log('Loading Item...');
  }

}
