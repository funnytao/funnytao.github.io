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
var ticket_pipe_1 = require('../ticket.pipe');
var sort_pipe_1 = require('../sort.pipe');
var filter_pipe_1 = require('../filter.pipe');
var TicketListComponent = (function () {
    function TicketListComponent(globalService, af, router) {
        var _this = this;
        this.globalService = globalService;
        this.af = af;
        this.router = router;
        this.datePickerInit = false;
        this.order = '-start_date';
        this.filter = 'filter';
        this.filterText = '';
        this.ticketsPerPage = 15;
        this.pageTag = 1;
        this.currentPage = 1;
        this.ticket_id = -1;
        this.ticket_length = 0;
        this.tickets = [];
        var url = '/private/' + localStorage.getItem('uid');
        this.username = af.database.object(url);
        af.database.list('/shared/ticket').subscribe(function (ticket) {
            _this.tickets = ticket;
            globalService.ticket_number = ticket.length;
            _this.ticket_length = ticket.length;
        });
    }
    TicketListComponent.prototype.queryBy = function (order) {
        if (this.order == order) {
            this.order = '-' + this.order;
        }
        else {
            this.order = order;
        }
    };
    TicketListComponent.prototype.maxPage = function () {
        return Math.round(this.ticket_length / this.ticketsPerPage);
    };
    TicketListComponent.prototype.onFilterChange = function (filter) {
        this.filter = filter;
        jQuery('.input-append.date').attr('id', 'datePicker');
    };
    TicketListComponent.prototype.filterBy = function (value, filter) {
        this.filter = filter;
        this.filterText = value.value;
        this.currentPage = 1;
        this.pageTag = 1;
    };
    TicketListComponent.prototype.onPageNav = function (value) {
        if (this.pageTag + value > 0 && this.pageTag + value <= this.ticket_length / this.ticketsPerPage) {
            this.pageTag = this.pageTag + value;
            this.currentPage = this.pageTag;
        }
    };
    TicketListComponent.prototype.showDatePicker = function () {
        jQuery('.input-append.date').attr('id', 'datePicker1');
        this.filter = 'date';
    };
    TicketListComponent.prototype.onPageChange = function (value) {
        this.currentPage = value;
    };
    TicketListComponent.prototype.viewTicket = function (value) {
        this.ticket_id = value.id;
        this.ticket_detail = value;
    };
    TicketListComponent.prototype.comment = function (name, value) {
        var tmp = this.ticket_detail.reply || [];
        tmp.push({
            username: this.globalService.username,
            content: value.value
        });
        value.value = null;
        this.ticket_detail.reply = tmp;
        this.af.database.object('/shared/ticket/' + this.ticket_id).update({ reply: tmp });
    };
    TicketListComponent.prototype.pageSetup = function (page) {
        this.ticketsPerPage = page;
        this.currentPage = 1;
        this.pageTag = 1;
    };
    TicketListComponent.prototype.onSolve = function () {
        var datenow = Math.floor(Date.now() / 1000);
        this.ticket_detail.end_date = datenow;
        this.af.database.object('/shared/ticket/' + this.ticket_id).update({ end_date: datenow });
    };
    TicketListComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        // console.log('changed');
        if (!this.datePickerInit) {
            jQuery('#datePicker1')
                .datetimepicker({
                language: 'pt-BR',
                maskInput: false,
            });
            this.datePickerInit = true;
            console.log('inited!');
            jQuery('.input-append.date').attr('id', 'datePicker');
        }
        if (this.ticket_length != Number(localStorage.getItem('tickets_number'))) {
            setTimeout(function (_) {
                _this.ticket_length = Number(localStorage.getItem('tickets_number'));
            });
        }
    };
    TicketListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-ticket-list',
            templateUrl: 'ticket-list.component.html',
            styleUrls: ['ticket-list.component.css'],
            pipes: [ticket_pipe_1.DateFormatPipe, sort_pipe_1.OrderBy, filter_pipe_1.MyFilterPipe],
        }), 
        __metadata('design:paramtypes', [global_service_1.GlobalService, angularfire2_1.AngularFire, router_1.Router])
    ], TicketListComponent);
    return TicketListComponent;
}());
exports.TicketListComponent = TicketListComponent;
//# sourceMappingURL=ticket-list.component.js.map