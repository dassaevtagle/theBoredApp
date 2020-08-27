"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ActivityResolverService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ActivityResolverService = /** @class */ (function () {
    function ActivityResolverService(api) {
        this.api = api;
    }
    ActivityResolverService.prototype.resolve = function (route, state) {
        return this.api.getRandomActivity()
            .pipe(operators_1.catchError(function (err) { return rxjs_1.of(err); }));
    };
    ActivityResolverService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ActivityResolverService);
    return ActivityResolverService;
}());
exports.ActivityResolverService = ActivityResolverService;
