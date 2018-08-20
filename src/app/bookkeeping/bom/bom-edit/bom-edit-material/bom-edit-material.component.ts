import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { MaterialBOM } from '../../bom.model';

@Component({
  selector: 'app-bom-edit-material',
  templateUrl: './bom-edit-material.component.html',
  styleUrls: ['./bom-edit-material.component.css']
})
export class BOMEditMaterialComponent implements OnInit {
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
