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
var IssueChartComponent = (function () {
    function IssueChartComponent(af) {
        var _this = this;
        this.af = af;
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = [];
        this.barChartType = 'bar';
        this.barChartLegend = false;
        this.lineChartColours = [
            {
                backgroundColor: 'rgba(28,175,154,1)',
                borderColor: 'rgba(28,175,154,1)',
                pointBackgroundColor: 'rgba(28,175,154,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(28,175,154,0.2)'
            },
        ];
        this.barChartData = [
            { data: [], label: 'Reported Issues' }
        ];
        af.database.object('shared/issues-chart').subscribe(function (item) {
            var labels = [];
            var data = [];
            for (var i in item) {
                if (i != '$key') {
                    labels.push(i + '');
                    data.push(item[i]);
                }
            }
            _this.barChartLabels = labels;
            _this.barChartData[0].data = data;
        });
    }
    IssueChartComponent.prototype.ngOnInit = function () {
    };
    IssueChartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-issue-chart',
            templateUrl: 'issue-chart.component.html',
            styleUrls: ['issue-chart.component.css'],
            directives: [ng2_charts_1.CHART_DIRECTIVES, common_1.NgClass, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire])
    ], IssueChartComponent);
    return IssueChartComponent;
}());
exports.IssueChartComponent = IssueChartComponent;
//# sourceMappingURL=issue-chart.component.js.map