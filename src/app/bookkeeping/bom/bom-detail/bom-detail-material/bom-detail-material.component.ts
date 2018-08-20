import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { MaterialBOM } from '../../bom.model';

@Component({
  selector: 'app-bom-detail-material',
  templateUrl: './bom-detail-material.component.html',
  styleUrls: ['./bom-detail-material.component.css']
})
export class BOMDetailMaterialComponent implements OnInit {
  @Input() materialBOM: MaterialBOM;
  @Input() index: number;
  private clicked: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  onClick(){
    this.clicked = !this.clicked;
  }


}
