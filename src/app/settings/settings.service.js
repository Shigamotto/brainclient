"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var SettingsService = (function () {
    function SettingsService(router, http) {
        this.router = router;
        this.http = http;
        this.profileChanged = new Subject_1.Subject();
    }
    SettingsService.prototype.setProfile = function (profile) {
        this.profile = profile;
        this.profileChanged.next(this.profile);
    };
    SettingsService.prototype.getProfile = function () {
        var _this = this;
        this.http.get('http://127.0.0.1:8000/api/u/?format=json')
            .subscribe(function (profile) {
            _this.setProfile(profile);
        });
    };
    ;
    SettingsService.prototype.getProfileSettings = function () {
        var _this = this;
        this.http.get('http://127.0.0.1:8000/api/u/set/?format=json')
            .subscribe(function (profile) {
            _this.setProfile(profile);
        });
    };
    ;
    SettingsService.prototype.editProfile = function (id, title, start, end) {
        this.http.put('http://127.0.0.1:8000/api/task/' + id + '/edit/', { title: title, date_start: start, date_end: end })
            .subscribe(function (res) { console.log(res); }, function (err) { console.log(err); });
    };
    SettingsService.prototype.toggleLTDMode = function () {
        if (!this.profile) {
            this.getProfile();
        }
        this.profile.ltdmode = !this.profile.ltdmode;
        this.setProfile(this.profile);
    };
    SettingsService.prototype.addOrganization = function () { };
    SettingsService.prototype.editOrganization = function () { };
    SettingsService.prototype.deleteOrganization = function () { };
    SettingsService.prototype.addMailbox = function () { };
    SettingsService.prototype.editMailbox = function () { };
    SettingsService.prototype.deleteMailbox = function () { };
    SettingsService = __decorate([
        core_1.Injectable()
    ], SettingsService);
    return SettingsService;
}());
exports.SettingsService = SettingsService;
