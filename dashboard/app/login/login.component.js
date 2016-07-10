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
var angularfire2_1 = require('angularfire2');
var global_service_1 = require('../shared/global.service');
var LoginComponent = (function () {
    function LoginComponent(af, router, globalService) {
        this.af = af;
        this.router = router;
        this.globalService = globalService;
        this.error = [];
        this.regerror = [];
        this.reg = false;
        this.logUser = {
            log_email: '',
            log_password: ''
        };
        this.regUser = {
            email: '',
            username: '',
            password: '',
            repassword: ''
        };
    }
    LoginComponent.prototype.regFormValid = function () {
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        this.regerror = [];
        if (this.regUser['email'] == '') {
            this.regerror.push('Please enter your email.');
        }
        else if (!re.test(this.regUser['email'])) {
            this.regerror.push('Please enter a valid email.');
        }
        if (this.regUser['username'] == '') {
            this.regerror.push('Please enter your username');
        }
        if (this.regUser['password'] == '') {
            this.regerror.push('Please enter your password.');
        }
        else if (this.regUser['password'].length > 16 || this.regUser['password'].length < 8) {
            this.regerror.push('You password should have 8-16 characters.');
        }
        if (this.regUser['repassword'] != this.regUser['password']) {
            this.regerror.push("You password don't match.");
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.af.auth.login({
            email: this.logUser['log_email'],
            password: this.logUser['log_password']
        }, {
            provider: angularfire2_1.AuthProviders.Password,
            method: angularfire2_1.AuthMethods.Password,
        })
            .then(function (auth) {
            console.log(auth.uid);
            _this.error = [];
            localStorage.setItem('uid', auth.uid);
            _this.router.navigate(['/page']);
        }).catch(function (error) {
            _this.error = [];
            _this.error.push(error.message);
        });
    };
    LoginComponent.prototype.googleLogin = function (credentials) {
        var _this = this;
        this.af.auth.login({
            provider: angularfire2_1.AuthProviders.Google,
            method: angularfire2_1.AuthMethods.Popup,
        })
            .then(function (auth) {
            console.log(auth.uid);
            _this.error = [];
            localStorage.setItem('uid', auth.uid);
            _this.router.navigate(['/page']);
        }).catch(function (error) {
            _this.error = [];
            _this.error.push(error.message);
        });
    };
    LoginComponent.prototype.register = function () {
        this.reg = !this.reg;
    };
    LoginComponent.prototype.loginValid = function () {
        this.error = [];
    };
    LoginComponent.prototype.registerValid = function () {
        var _this = this;
        this.af.auth.createUser({
            email: this.regUser['email'],
            password: this.regUser['password']
        })
            .then(function (auth) {
            _this.af.database.object('private/' + auth.uid).set({
                username: _this.regUser['username']
            });
            _this.error = [];
            localStorage.setItem('uid', auth.uid);
            _this.router.navigate(['/page']);
        }).catch(function (error) {
            _this.regerror = [];
            _this.regerror.push(error);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            // selector: 'app-login',
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css']
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, router_1.Router, global_service_1.GlobalService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map