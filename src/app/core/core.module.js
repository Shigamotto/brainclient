"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/common/http');
var header_component_1 = require('./header/header.component');
var home_component_1 = require('./home/home.component');
var app_routing_module_1 = require('../app-routing.module');
var shared_module_1 = require('../shared/shared.module');
var auth_service_1 = require('../auth/auth.service');
var auth_interceptor_1 = require('../shared/auth.interceptor');
var logging_interceptor_1 = require('../shared/logging.interceptor');
// import { RecipeService } from '../recipes/recipe.service';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';
// import { DataStorageService } from '../shared/data-storage.service';
var CoreModule = (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        core_1.NgModule({
            declarations: [
                header_component_1.HeaderComponent,
                home_component_1.HomeComponent
            ],
            imports: [
                shared_module_1.SharedModule,
                app_routing_module_1.AppRoutingModule
            ],
            exports: [
                app_routing_module_1.AppRoutingModule,
                header_component_1.HeaderComponent
            ],
            providers: [
                auth_service_1.AuthService,
                { provide: http_1.HTTP_INTERCEPTORS, useClass: auth_interceptor_1.AuthInterceptor, multi: true },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: logging_interceptor_1.LoggingInterceptor, multi: true }
            ]
        })
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
