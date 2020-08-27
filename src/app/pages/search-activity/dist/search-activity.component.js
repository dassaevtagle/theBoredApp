"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchActivityComponent = void 0;
var core_1 = require("@angular/core");
var nouislider_1 = require("nouislider");
var sweetalert2_1 = require("sweetalert2");
var SearchActivityComponent = /** @class */ (function () {
    function SearchActivityComponent(api) {
        this.api = api;
        this.queriedActivity = {
            activity: '',
            type: 'default',
            participants: 0,
            price: 0,
            link: '',
            key: '',
            accessibility: 0,
            error: ''
        };
        this.onActivityQuery = new core_1.EventEmitter();
    }
    SearchActivityComponent.prototype.ngOnInit = function () {
        var sliderPart = document.getElementById("sliderDoubleParticipants");
        nouislider_1["default"].create(sliderPart, {
            start: 0,
            connect: true,
            step: 1,
            range: {
                min: 0,
                max: 5
            }
        });
        var participantsField = document.getElementById('sliderNumberParticipants');
        sliderPart.noUiSlider.on('update', function (values, handle) {
            switch (values[handle]) {
                case '0.00':
                    participantsField.innerHTML = 'Default';
                    break;
                default:
                    participantsField.innerHTML = Math.round(values[handle]).toString();
                    break;
            }
        });
        var sliderCost = document.getElementById("sliderDoubleCost");
        nouislider_1["default"].create(sliderCost, {
            start: [0, 100],
            connect: true,
            range: {
                min: 0,
                max: 100
            }
        });
        var sliderCostValueElement = document.getElementById('sliderNumberCost');
        sliderCost.noUiSlider.on('update', function (values) {
            if (values[0] == 0.00)
                values[0] = 'Free';
            if (values[0] > 0.00 && values[0] <= 25)
                values[0] = 'Low';
            if (values[0] > 25 && values[0] <= 50)
                values[0] = 'Moderate';
            if (values[0] > 50 && values[0] <= 75)
                values[0] = 'May cost a little bit';
            if (values[0] > 75 && values[0] <= 100)
                values[0] = 'Could be expensive';
            if (values[1] == 0.00)
                values[1] = 'Free';
            if (values[1] > 0.00 && values[1] <= 25)
                values[1] = 'Low';
            if (values[1] > 25 && values[1] <= 50)
                values[1] = 'Moderate';
            if (values[1] > 50 && values[1] <= 75)
                values[1] = 'May cost a little bit';
            if (values[1] > 75 && values[1] <= 100)
                values[1] = 'Could be expensive';
            sliderCostValueElement.innerHTML = 'From:' + '&nbsp;' + values[0] + '&nbsp; To: &nbsp;' + values[1];
        });
        var sliderAcc = document.getElementById("sliderDoubleAccessibility");
        nouislider_1["default"].create(sliderAcc, {
            range: {
                'min': 0,
                'max': 100
            },
            start: [0, 100],
            connect: true
        });
        var sliderAccValueElement = document.getElementById('sliderNumberAccessibility');
        sliderAcc.noUiSlider.on('update', function (values) {
            values[0] = Math.round(values[0]) + '%';
            values[1] = Math.round(values[1]) + '%';
            sliderAccValueElement.innerHTML = values.join(' - ');
        });
    };
    SearchActivityComponent.prototype.reset = function () {
        var type = document.getElementById('type');
        var sliderPart = document.getElementById("sliderDoubleParticipants");
        var sliderCost = document.getElementById("sliderDoubleCost");
        var sliderAcc = document.getElementById("sliderDoubleAccessibility");
        type.options[0].selected = true;
        this.queriedActivity.type = 'default';
        type.selectedIndex = 0;
        sliderPart.noUiSlider.reset();
        sliderCost.noUiSlider.reset();
        sliderAcc.noUiSlider.reset();
        this.queriedActivity = {
            activity: '',
            type: 'default',
            participants: 0,
            price: 0,
            link: '',
            key: '',
            accessibility: 0,
            error: ''
        };
        this.onActivityQuery.emit(this.queriedActivity);
    };
    SearchActivityComponent.prototype.onSubmit = function (form) {
        var sliderPart = document.getElementById("sliderDoubleParticipants");
        var sliderCost = document.getElementById("sliderDoubleCost");
        var sliderAcc = document.getElementById("sliderDoubleAccessibility");
        this.queriedActivity.participants = parseInt(sliderPart.noUiSlider.get());
        this.queriedActivity.price = sliderCost.noUiSlider.get();
        this.queriedActivity.accessibility = sliderAcc.noUiSlider.get();
        this.queriedActivity.price[0] /= 100;
        this.queriedActivity.price[1] /= 100;
        this.queriedActivity.price[0] = Math.round(this.queriedActivity.price[0] * 10) / 10;
        this.queriedActivity.price[1] = Math.round(this.queriedActivity.price[1] * 10) / 10;
        this.queriedActivity.accessibility[0] = 100 - this.queriedActivity.accessibility[0];
        this.queriedActivity.accessibility[1] = 100 - this.queriedActivity.accessibility[1];
        this.queriedActivity.accessibility[0] /= 100;
        this.queriedActivity.accessibility[1] /= 100;
        this.queriedActivity.accessibility[0] = Math.round(this.queriedActivity.accessibility[0] * 10) / 10;
        this.queriedActivity.accessibility[1] = Math.round(this.queriedActivity.accessibility[1] * 10) / 10;
        this.queriedActivity.accessibility = this.queriedActivity.accessibility.reverse();
        console.log(this.queriedActivity);
        this.api.queryActivity(this.queriedActivity)
            .subscribe(function (act) {
            if (act.error != null) {
                console.log('Error: ' + act.error);
                console.log(act);
                sweetalert2_1["default"].fire('Oops...', act.error, 'error');
            }
        });
        this.onActivityQuery.emit(this.queriedActivity);
    };
    __decorate([
        core_1.Output()
    ], SearchActivityComponent.prototype, "onActivityQuery");
    SearchActivityComponent = __decorate([
        core_1.Component({
            selector: 'search-activity',
            templateUrl: './search-activity.component.html',
            styleUrls: ['./search-activity.component.scss']
        })
    ], SearchActivityComponent);
    return SearchActivityComponent;
}());
exports.SearchActivityComponent = SearchActivityComponent;
