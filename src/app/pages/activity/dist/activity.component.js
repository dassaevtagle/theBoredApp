"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ActivityComponent = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ActivityComponent = /** @class */ (function () {
    function ActivityComponent(route) {
        this.route = route;
        this.onQuery = new core_1.EventEmitter;
    }
    ActivityComponent.prototype.ngOnInit = function () {
        var resolvedData = this.route.snapshot.data['resolvedActivity'];
        if (resolvedData instanceof http_1.HttpErrorResponse) {
            console.log(http_1.HttpErrorResponse);
        }
        else {
            this.activity = resolvedData;
            console.log(resolvedData);
        }
    };
    ActivityComponent.prototype.passActivityQuery = function (activity) {
        this.onQuery.emit(activity);
    };
    __decorate([
        core_1.Output()
    ], ActivityComponent.prototype, "onQuery");
    ActivityComponent = __decorate([
        core_1.Component({
            selector: 'app-activity',
            templateUrl: './activity.component.html',
            styleUrls: ['./activity.component.scss']
        })
    ], ActivityComponent);
    return ActivityComponent;
}());
exports.ActivityComponent = ActivityComponent;
