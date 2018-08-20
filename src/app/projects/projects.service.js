"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/map');
var ProjectsService = (function () {
    function ProjectsService(router, http, authService) {
        this.router = router;
        this.http = http;
        this.authService = authService;
        this.tasks = [];
        this.taskChanged = new Subject_1.Subject();
    }
    ProjectsService.prototype.setTasks = function (tasks) {
        this.tasks = tasks;
        this.taskChanged.next(this.tasks.slice());
    };
    ProjectsService.prototype.getTasks = function () {
        var _this = this;
        this.http.get('http://127.0.0.1:8000/api/task/?format=json')
            .subscribe(function (tasks) {
            _this.setTasks(tasks);
        });
    };
    ;
    ProjectsService.prototype.getFreshTasks = function () {
        var _this = this;
        this.http.get('http://127.0.0.1:8000/api/task/fresh/?format=json')
            .subscribe(function (tasks) {
            _this.setTasks(tasks);
        });
    };
    ;
    ProjectsService.prototype.makeTask = function (title, start, end) {
        this.http.post('http://127.0.0.1:8000/api/task/create/', { title: title, date_start: start, date_end: end })
            .subscribe(function (res) { console.log(res); }, function (err) { console.log(err); });
    };
    ProjectsService.prototype.editTask = function (id, title, start, end) {
        this.http.put('http://127.0.0.1:8000/api/task/' + id + '/edit/', { title: title, date_start: start, date_end: end })
            .subscribe(function (res) { console.log(res); }, function (err) { console.log(err); });
    };
    ProjectsService.prototype.deleteTask = function (id) {
        this.http.delete('http://127.0.0.1:8000/api/task/' + id + '/delete/')
            .subscribe(function (res) { console.log(res); }, function (err) { console.log(err); });
    };
    ProjectsService = __decorate([
        core_1.Injectable()
    ], ProjectsService);
    return ProjectsService;
}());
exports.ProjectsService = ProjectsService;
