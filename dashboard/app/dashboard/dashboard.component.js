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
var angularfire2_1 = require('angularfire2');
var global_service_1 = require('../shared/global.service');
var customer_chart_component_1 = require('../customer-chart/customer-chart.component');
var issue_chart_component_1 = require('../issue-chart/issue-chart.component');
var router_1 = require('@angular/router');
var DashboardComponent = (function () {
    function DashboardComponent(af, _elRef, globalService, router) {
        this.af = af;
        this._elRef = _elRef;
        this.globalService = globalService;
        this.router = router;
        if (localStorage.getItem('uid') == 'null' || localStorage.getItem('uid') == '') {
            localStorage.setItem('uid', '');
            this.router.navigate(['/login']);
            console.log('redirectd');
        }
        this.item = af.database.list('shared/employee-map');
    }
    DashboardComponent.prototype.renderMap = function (item) {
        var mapData = item;
        delete mapData.$key;
        jQuery('#world-map').empty();
        jQuery('#world-map').vectorMap({
            map: 'world_mill',
            backgroundColor: '#fff',
            regionStyle: { initial: { fill: '#000000' } },
            series: {
                regions: [{
                        values: item,
                        scale: ['#00a6f1', '#003c58'],
                        normalizeFunction: 'polynomial',
                        attribute: 'fill',
                    }]
            },
            onRegionTipShow: function (e, el, code) {
                el.html(el.html() + ' (Employee - ' + item[code] + ')');
            }
        });
    };
    DashboardComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.af.database.object('shared/employee-map').subscribe(function (item) {
            _this.renderMap(item);
        });
        var clock = jQuery('.your-clock').FlipClock({});
        var currentTime = (new Date().getHours() * 60 + new Date().getMinutes()) * 60 + new Date().getSeconds();
        clock.setTime(currentTime);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-dashboard',
            templateUrl: 'dashboard.component.html',
            styleUrls: ['dashboard.component.css'],
            directives: [customer_chart_component_1.CustomerChartComponent, issue_chart_component_1.IssueChartComponent],
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, core_1.ElementRef, global_service_1.GlobalService, router_1.Router])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map