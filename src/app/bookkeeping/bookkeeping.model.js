"use strict";
var BookSheet = (function () {
    function BookSheet(id, title, simple, desc, date_pub, amount, created_by, status_pay, status_get, lines, status_history, from, to, warehouse, refers, attach) {
        this.id = id;
        this.title = title;
        this.simple = simple;
        this.desc = desc;
        this.lines = lines;
        this.date_pub = date_pub;
        this.amount = amount;
        this.created_by = created_by;
        this.status_pay = status_pay;
        this.status_get = status_get;
        this.status_history = status_history;
        this.from = from;
        this.to = to;
        this.warehouse = warehouse;
        this.refers = refers;
        this.attach = attach;
    }
    BookSheet.EMPTY_MODEL = {
        id: 0,
        title: '',
        simple: true,
        desc: '',
        lines: [],
        date_pub: '',
        amount: 0,
        created_by: '',
        status_pay: 0,
        status_get: 0,
        status_history: [],
        from: {},
        to: {},
        warehouse: '',
        refers: [],
        attach: [],
    };
    return BookSheet;
}());
exports.BookSheet = BookSheet;
