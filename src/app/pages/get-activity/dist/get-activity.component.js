"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GetActivityComponent = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var sweetalert2_1 = require("sweetalert2");
var GetActivityComponent = /** @class */ (function () {
    function GetActivityComponent(api) {
        this.api = api;
    }
    GetActivityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activityQuery.
            subscribe(function (act) { _this.query = act; });
    };
    GetActivityComponent.prototype.ngOnChanges = function () {
    };
    GetActivityComponent.prototype.refresh = function () {
        var _this = this;
        if (this.query != null) {
            this.api.queryActivity(this.query)
                .subscribe(function (act) { _this.handleNewActivity(act); });
        }
        else {
            this.api.getRandomActivity()
                .subscribe(function (act) { _this.handleNewActivity(act); });
        }
    };
    GetActivityComponent.prototype.handleNewActivity = function (activity) {
        if (activity instanceof http_1.HttpErrorResponse) {
            this.error = http_1.HttpErrorResponse.name;
            console.log(activity);
        }
        else if (activity.error != null) {
            this.error = activity.error;
            console.log('Error: ' + activity.error);
            console.log(activity);
            sweetalert2_1["default"].fire('Oops...', activity.error, 'error');
        }
        else {
            this.error = null;
            console.log(activity);
            this.activity = activity;
        }
    };
    __decorate([
        core_1.Input()
    ], GetActivityComponent.prototype, "activity");
    __decorate([
        core_1.Input()
    ], GetActivityComponent.prototype, "activityQuery");
    GetActivityComponent = __decorate([
        core_1.Component({
            selector: 'get-activity',
            templateUrl: './get-activity.component.html',
            styleUrls: ['./get-activity.component.scss']
        })
    ], GetActivityComponent);
    return GetActivityComponent;
}());
exports.GetActivityComponent = GetActivityComponent;
