"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var _1 = require('./app/');
var app_routes_1 = require('./app/app.routes');
var angularfire2_1 = require('angularfire2');
var global_service_1 = require('./app/shared/global.service');
var forms_1 = require('@angular/forms');
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.AppComponent, [
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    app_routes_1.APP_ROUTER_PROVIDERS,
    angularfire2_1.FIREBASE_PROVIDERS,
    // Initialize Firebase app
    angularfire2_1.defaultFirebase({
        apiKey: "AIzaSyA9SmCL17w3uUQDED945uMXp0L7VUROlOE",
        authDomain: "angular-dashboard.firebaseapp.com",
        databaseURL: "https://angular-dashboard.firebaseio.com",
        storageBucket: "angular-dashboard.appspot.com",
    }),
    global_service_1.GlobalService
])
    .catch(function (err) { return console.error(err); });
;
//# sourceMappingURL=main.js.map