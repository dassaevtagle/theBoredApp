"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        this.url = 'https://www.boredapi.com/api/activity';
    }
    ApiService.prototype.getRandomActivity = function () {
        return this.http.get(this.url)
            .pipe(operators_1.catchError(function (error) { return rxjs_1.throwError(error); }));
    };
    ApiService.prototype.queryActivity = function (queriedActivity) {
        var queryUrl = '?';
        var queryTypes;
        var queryParticipants;
        var queryPrice;
        var queryAccessibility;
        if (queriedActivity.type !== 'default') {
            queryTypes = "type=" + queriedActivity.type;
        }
        if (queriedActivity.participants != 0) {
            queryParticipants = "participants=" + queriedActivity.participants.toString();
        }
        if (queriedActivity.price) {
            queryPrice = "minprice=" + queriedActivity.price[0] + "&maxprice=" + queriedActivity.price[1];
        }
        if (queriedActivity.accessibility) {
            queryAccessibility = "minaccessibility=" + queriedActivity.accessibility[0] + "&maxaccessibility=" + queriedActivity.accessibility[1];
        }
        if (queryAccessibility == null && queryParticipants == null && queryPrice == null && queryPrice == null) {
            return this.getRandomActivity();
        }
        else {
            if (queryTypes != null) {
                queryUrl += queryTypes;
            }
            if (queryParticipants != null) {
                queryUrl += '&' + queryParticipants;
            }
            if (queryPrice != null) {
                queryUrl += '&' + queryPrice;
            }
            if (queryAccessibility != null) {
                queryUrl += '&' + queryAccessibility;
            }
            console.log(queryUrl);
            return this.http.get(this.url + queryUrl)
                .pipe(operators_1.catchError(function (error) { return rxjs_1.throwError(error); }));
        }
    };
    ApiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
