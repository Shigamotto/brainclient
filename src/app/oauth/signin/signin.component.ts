import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { OAuthService } from '../oauth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class OAuthSigninComponent implements OnInit {

  constructor(private authService: OAuthService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
  }

}
