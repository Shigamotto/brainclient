import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {
  subscription: Subscription;

  constructor(
    private http:HttpClient,
    private router: Router
  ) {}

  ngOnInit() {}

  doSearch(){
    this.router.navigate([ { outlets: {search: ['search'] } }]);
  }
}
