"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var moment = require('moment');
var bookkeeping_model_1 = require('./bookkeeping.model');
var BookkeepingService = (function () {
    function BookkeepingService(router, http, authService) {
        this.router = router;
        this.http = http;
        this.authService = authService;
        this.bookSheets = [];
        this.sheetChanged = new Subject_1.Subject();
        this.sheetChose = new Subject_1.Subject();
    }
    BookkeepingService.prototype.setBookSheets = function (bookSheets) {
        this.bookSheets = bookSheets;
        this.sheetChanged.next(this.bookSheets.slice());
    };
    BookkeepingService.prototype.getBookSheets = function () {
        var _this = this;
        this.http.get('http://127.0.0.1:8000/api/bk/?format=json')
            .map(function (sheets) {
            return sheets.map(function (sheet) {
                var oldDate = moment(sheet.date_pub);
                var newDate;
                if (oldDate.isAfter(new Date(), 'day')) {
                    newDate = oldDate.format("DD MMM");
                }
                else if (oldDate.isAfter(new Date(), 'year')) {
                    newDate = oldDate.format("HH:mm");
                }
                else {
                    newDate = oldDate.format("DD MMM YY");
                }
                return new bookkeeping_model_1.BookSheet(sheet.pk, sheet.title, sheet.simple, sheet.desc, newDate, sheet.amount, sheet.created_by, sheet.status_pay, sheet.status_get, sheet.lines, sheet.status_history, sheet.from, sheet.to, sheet.warehouse, sheet.refers, sheet.attach);
            });
        })
            .subscribe(function (sheets) {
            _this.setBookSheets(sheets);
        });
    };
    ;
    BookkeepingService.prototype.setBookSheet = function (bookSheet) {
        this.bookSheet = bookSheet;
        this.sheetChose.next(this.bookSheet);
    };
    BookkeepingService.prototype.getBookSheet = function (id) {
        var _this = this;
        this.http.get('http://127.0.0.1:8000/api/bk/' + id + '/?format=json')
            .map(function (sheet) {
            var oldDate = moment(sheet.date_pub);
            var newDate;
            if (oldDate.isAfter(new Date(), 'day')) {
                newDate = oldDate.format("DD MMM");
            }
            else if (oldDate.isAfter(new Date(), 'year')) {
                newDate = oldDate.format("HH:mm");
            }
            else {
                newDate = oldDate.format("DD MMM YY");
            }
            return new bookkeeping_model_1.BookSheet(sheet.pk, sheet.title, sheet.simple, sheet.desc, newDate, sheet.amount, sheet.created_by, sheet.status_pay, sheet.status_get, sheet.lines, sheet.status_history, sheet.from, sheet.to, sheet.warehouse, sheet.refers, sheet.attach);
        })
            .subscribe(function (sheet) {
            _this.setBookSheet(sheet);
        });
        return this.sheetChose.asObservable();
    };
    BookkeepingService = __decorate([
        core_1.Injectable()
    ], BookkeepingService);
    return BookkeepingService;
}());
exports.BookkeepingService = BookkeepingService;
