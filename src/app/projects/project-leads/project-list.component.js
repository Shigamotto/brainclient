"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var moment = require('moment');
var ProjectListComponent = (function () {
    function ProjectListComponent(projectService) {
        this.projectService = projectService;
    }
    ProjectListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectService.getTasks();
        this.subscription = this.projectService.taskChanged
            .map(function (tasks) {
            return tasks.map(function (task) {
                task["id"] = task["pk"];
                task["date"]["pub"] = moment(task["date"]["pub"]).format('YYYY MMM DD HH:mm');
                task["date"]["start"] = moment(task["date"]["start"]).format('YYYY MMM DD HH:mm');
                if (task["date"]["end"] > task["date"]["dead"]) {
                    task["over"] = true;
                }
                task["date"]["end"] = moment(task["date"]["end"]).format('YYYY MMM DD HH:mm');
                task["date"]["dead"] = moment(task["date"]["dead"]).format('YYYY MMM DD HH:mm');
                return task;
            });
        })
            .subscribe(function (tasks) {
            console.log(tasks);
            _this.tasks = tasks;
        });
    };
    ProjectListComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ProjectListComponent = __decorate([
        core_1.Component({
            selector: 'app-project-list',
            templateUrl: './project-list.component.html',
            styleUrls: ['./project-list.component.css']
        })
    ], ProjectListComponent);
    return ProjectListComponent;
}());
exports.ProjectListComponent = ProjectListComponent;
