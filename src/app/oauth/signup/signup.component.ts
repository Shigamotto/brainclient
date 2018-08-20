import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { OAuthService } from '../oauth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class OAuthSignupComponent implements OnInit {

  constructor(private authService: OAuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password);
  }

}
