"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var angularfire2_1 = require('angularfire2');
var ng2_charts_1 = require('ng2-charts/ng2-charts');
var CustomerChartComponent = (function () {
    function CustomerChartComponent(af) {
        var _this = this;
        this.af = af;
        // lineChart
        this.lineChartData = [
            { data: [], label: 'Paying Customers' }
        ];
        this.lineChartLabels = [];
        this.lineChartOptions = {
            animation: false,
            responsive: true
        };
        this.lineChartColours = [
            {
                backgroundColor: 'rgba(51,65,78,0.8)',
                borderColor: 'rgba(51,65,78,1)',
                pointBackgroundColor: 'rgba(51,65,78,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(51,65,78,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        af.database.object('shared/customer-chart').subscribe(function (item) {
            var labels = [];
            var data = [];
            for (var i in item) {
                if (i != '$key') {
                    labels.push(i + '');
                    data.push(item[i]);
                }
            }
            _this.lineChartLabels = labels;
            _this.lineChartData[0].data = data;
        });
    }
    CustomerChartComponent.prototype.ngOnInit = function () {
    };
    CustomerChartComponent.prototype.randomize = function () {
        var _lineChartData = new Array(this.lineChartData.length);
        for (var i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
            for (var j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    };
    // events
    CustomerChartComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    CustomerChartComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    CustomerChartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-customer-chart',
            templateUrl: 'customer-chart.component.html',
            styleUrls: ['customer-chart.component.css'],
            directives: [ng2_charts_1.CHART_DIRECTIVES, common_1.NgClass, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire])
    ], CustomerChartComponent);
    return CustomerChartComponent;
}());
exports.CustomerChartComponent = CustomerChartComponent;
//# sourceMappingURL=customer-chart.component.js.map