"use strict";
require('rxjs/add/operator/do');
var LoggingInterceptor = (function () {
    function LoggingInterceptor() {
    }
    LoggingInterceptor.prototype.intercept = function (req, next) {
        return next.handle(req).do(function (event) {
            console.log('Logging interceptor', event);
        });
    };
    return LoggingInterceptor;
}());
exports.LoggingInterceptor = LoggingInterceptor;
