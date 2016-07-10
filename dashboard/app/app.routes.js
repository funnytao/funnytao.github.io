"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./login/login.component');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var page_component_1 = require('./page/page.component');
var ticket_component_1 = require('./ticket/ticket.component');
var ticket_list_component_1 = require('./ticket/ticket-list/ticket-list.component');
var ticket_form_component_1 = require('./ticket/ticket-form/ticket-form.component');
exports.routes = [
    { path: '', redirectTo: '/page', terminal: true },
    {
        path: 'page', component: page_component_1.PageComponent,
        children: [
            {
                path: '',
                component: dashboard_component_1.DashboardComponent
            },
            {
                path: 'ticket',
                component: ticket_component_1.TicketComponent,
                children: [
                    {
                        path: '',
                        component: ticket_list_component_1.TicketListComponent
                    },
                    {
                        path: 'new',
                        component: ticket_form_component_1.TicketFormComponent
                    }
                ]
            }
        ]
    },
    { path: 'login', component: login_component_1.LoginComponent },
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map