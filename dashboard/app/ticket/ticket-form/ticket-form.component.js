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
var router_1 = require('@angular/router');
var global_service_1 = require('../../shared/global.service');
var angularfire2_1 = require('angularfire2');
var TicketFormComponent = (function () {
    function TicketFormComponent(globalService, af, router) {
        var _this = this;
        this.globalService = globalService;
        this.af = af;
        this.router = router;
        this.form = {
            title: '',
            date: '',
            customer: '',
            email: '',
            employee: '',
            description: ''
        };
        this.submitted = false;
        this.ticket_length = 0;
        this.error = [];
        af.database.list('/shared/ticket').subscribe(function (ticket) {
            globalService.ticket_number = ticket.length;
            _this.ticket_length = ticket.length;
        });
    }
    TicketFormComponent.prototype.ngOnInit = function () {
        jQuery('#datePicker1')
            .datetimepicker({
            language: 'pt-BR'
        });
        console.log('inited!');
    };
    TicketFormComponent.prototype.clearForm = function () {
        for (var i in this.form) {
            this.form[i] = '';
        }
        this.error = [];
    };
    TicketFormComponent.prototype.onSubmit = function (value) {
        var _this = this;
        this.form.date = value;
        console.log(this.form);
        this.onSubmitValid();
        if (this.error.length == 0) {
            this.af.database.object('/shared/ticket/' + this.ticket_length).update({
                customer: this.form.customer,
                description: this.form.description,
                email: this.form.email,
                employee: this.form.employee,
                id: this.ticket_length + 1,
                title: this.form.title,
                start_date: new Date(this.form.date).getTime() / 1000,
                end_date: 'active'
            });
            this.submitted = true;
            setTimeout(function () { return _this.router.navigate(['/page/ticket']); }, 3000);
        }
    };
    TicketFormComponent.prototype.onSubmitValid = function () {
        this.error = [];
        for (var i in this.form) {
            if (this.form[i] == '') {
                this.error.push('Please finish the form');
                return;
            }
        }
        var tmp = this.form.date.split('/');
        var days = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];
        if (tmp.length != 3) {
            this.error.push('Date format should be mm/dd/yyyy');
            return;
        }
        var year = tmp[2];
        var nowyear = new Date().getFullYear() + '';
        if (year < '2010' || year > nowyear) {
            this.error.push('Please enter a valid date');
            return;
        }
        var month = tmp[0];
        if (month.charAt(0) == '0') {
            month = month.charAt(1);
        }
        if (Number(month) < 1 || Number(month) > 12) {
            this.error.push('Please enter a valid date');
            return;
        }
        var day = tmp[1];
        if (Number(year) % 4 == 0) {
            days[1] = '29';
        }
        if (day < '01' || day > days[Number(month)]) {
            this.error.push('Please enter a valid date');
        }
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        if (!re.test(this.form.email)) {
            this.error.push('Please enter a valid email address');
            return;
        }
    };
    TicketFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-ticket-form',
            templateUrl: 'ticket-form.component.html',
            styleUrls: ['ticket-form.component.css'],
        }), 
        __metadata('design:paramtypes', [global_service_1.GlobalService, angularfire2_1.AngularFire, router_1.Router])
    ], TicketFormComponent);
    return TicketFormComponent;
}());
exports.TicketFormComponent = TicketFormComponent;
//# sourceMappingURL=ticket-form.component.js.map