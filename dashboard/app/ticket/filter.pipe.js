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
var MyFilterPipe = (function () {
    function MyFilterPipe() {
    }
    MyFilterPipe.prototype.transform = function (items, args) {
        var count = 0;
        localStorage.setItem('tickets_number', count + '');
        if (args[0] == "active") {
            return items.filter(function (item) {
                if (item.end_date == 'active') {
                    count++;
                    localStorage.setItem('tickets_number', count + '');
                    return true;
                }
            });
        }
        else if (args[0] == "closed") {
            return items.filter(function (item) {
                if (item.end_date != 'active') {
                    count++;
                    localStorage.setItem('tickets_number', count + '');
                    return true;
                }
            });
        }
        else if (args[0] == 'filter' || args[1] == '') {
            return items.filter(function (item) {
                count++;
                localStorage.setItem('tickets_number', count + '');
                return true;
            });
        }
        else if (args[0] == 'date') {
            return items.filter(function (item) {
                var date = new Date(item.start_date * 1000);
                var year = date.getFullYear();
                var month = date.getMonth() + 1 + '';
                if (month.length == 1) {
                    month = '0' + month;
                }
                var day = date.getDate() + '';
                if (day.length == 1) {
                    day = '0' + day;
                }
                var datestring = month + '/' + day + '/' + year;
                if (datestring == args[1]) {
                    count++;
                    localStorage.setItem('tickets_number', count + '');
                    return true;
                }
            });
        }
        else {
            return items.filter(function (item) {
                if (item[args[0]].toLowerCase().indexOf(args[1].toLowerCase()) !== -1) {
                    count++;
                    localStorage.setItem('tickets_number', count + '');
                    return true;
                }
            });
        }
    };
    MyFilterPipe = __decorate([
        core_1.Pipe({
            name: 'myfilter',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], MyFilterPipe);
    return MyFilterPipe;
}());
exports.MyFilterPipe = MyFilterPipe;
//# sourceMappingURL=filter.pipe.js.map