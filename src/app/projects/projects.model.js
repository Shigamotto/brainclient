"use strict";
var Task = (function () {
    function Task(id, title, date, budget, status, status_history, from, to, desc, assigned_to, attach) {
        if (budget === void 0) { budget = 0; }
        this.id = id;
        this.title = title;
        this.date = date;
        this.budget = budget;
        this.status = status;
        this.status_history = status_history;
        this.from = from;
        this.to = to;
        this.desc = desc;
        this.assigned_to = assigned_to;
        this.attach = attach;
    }
    return Task;
}());
exports.Task = Task;
/*
export class Task {
    pk: number;
    title: string;
    start:	string;
    end: string;
    allDay:	boolean;
  }
*/
