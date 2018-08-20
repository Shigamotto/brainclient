import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-promo-menu',
  templateUrl: './promo-menu.component.html',
  styleUrls: ['./promo-menu.component.css']
})
export class PromoMenuComponent implements OnInit {
  signinFormOpen: boolean = false;
  subscription: Subscription;

  constructor(
    private http:HttpClient
  ) {}

  ngOnInit() {}

  SignInFormOpen() {
    this.signinFormOpen = !this.signinFormOpen;
  }

}
