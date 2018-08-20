"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/common/http');
var OAuthService = (function () {
    function OAuthService(settingsService, router, http) {
        this.settingsService = settingsService;
        this.router = router;
        this.http = http;
        this.client_id = "mRzI61wJdnwidVBq8Yc64KP9fjUsm1BEkHc2pTt2";
        this.client_secret = "QEccqNQrJfr673aXkvmJnkmuPHsNifRdeFXSweyj1zcIbz95JOqHUVYTdrSME7ws9SiXH2FMgIWpTsBNWYUyE8EVIuZOWpKH6cEvWYf5bUf4xD5vuewBlT9dO1m73bmT";
        if (!this.access_token) {
            if (localStorage.getItem('bpa_token') !== null) {
                var storage = JSON.parse(localStorage.getItem('bpa_token'));
                this.access_token = storage['access_token'];
                this.refresh_token = storage['refresh_token'];
            }
        }
    }
    OAuthService.prototype.signupUser = function (email, password) {
    };
    OAuthService.prototype.signinUser = function (email, password) {
        var _this = this;
        this.user = email;
        this.http.post('http://127.0.0.1:8000/api/oauth/token/', {
            "client_id": this.client_id,
            "client_secret": this.client_secret,
            "grant_type": "password",
            "username": email,
            "password": password
        })
            .subscribe(function (data) {
            localStorage.setItem('bpa_token', JSON.stringify({
                access_token: data['access_token'],
                refresh_token: data['refresh_token']
            }));
            // localStorage.setItem('brainpark', JSON.stringify({refresh_token: data['refresh_token']}));
            _this.access_token = data['access_token'];
            _this.refresh_token = data['refresh_token'];
            _this.router.navigate(['/projects/']);
            _this.settingsService.getProfile();
        }, function (err) {
            console.log(err);
        });
    };
    OAuthService.prototype.logout = function () {
        localStorage.removeItem('bpa_token');
        this.access_token = null;
        this.refresh_token = null;
        this.user = null;
    };
    OAuthService.prototype.refreshToken = function (token) {
        var _this = this;
        if (token === void 0) { token = this.refresh_token; }
        console.log(token);
        this.http.post('http://127.0.0.1:8000/api/oauth/token/', {
            "client_id": this.client_id,
            "client_secret": this.client_secret,
            "grant_type": "refresh_token",
            "refresh_token": token
        }, {
            headers: new http_1.HttpHeaders().set('Content-Type', 'application/json'),
        })
            .subscribe(function (data) {
            localStorage.setItem('bpa_token', JSON.stringify({
                access_token: data['access_token'],
                refresh_token: data['refresh_token']
            }));
            _this.refresh_token = data['refresh_token'];
            _this.access_token = data['access_token'];
        }, function (err) {
            console.log(err);
        });
    };
    ;
    OAuthService.prototype.getToken = function () {
        return this.access_token;
    };
    OAuthService.prototype.getUser = function () {
        return this.user;
    };
    OAuthService.prototype.isAuthenticated = function () {
        return this.access_token != null;
    };
    OAuthService = __decorate([
        core_1.Injectable()
    ], OAuthService);
    return OAuthService;
}());
exports.OAuthService = OAuthService;
