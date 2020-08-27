"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TransformDecimalsPipe = void 0;
var core_1 = require("@angular/core");
var TransformDecimalsPipe = /** @class */ (function () {
    function TransformDecimalsPipe() {
    }
    TransformDecimalsPipe.prototype.transform = function (value) {
        if (value == 0)
            return 'Free';
        if (value > 0 && value <= 0.25)
            return 'Low';
        if (value > 0.25 && value <= 0.50)
            return 'Moderate';
        if (value > 0.50 && value <= 0.75)
            return 'May cost a little bit';
        if (value > 0.75 && value <= 1)
            return 'Could be expensive';
    };
    TransformDecimalsPipe = __decorate([
        core_1.Pipe({
            name: 'transformDecimals'
        })
    ], TransformDecimalsPipe);
    return TransformDecimalsPipe;
}());
exports.TransformDecimalsPipe = TransformDecimalsPipe;
