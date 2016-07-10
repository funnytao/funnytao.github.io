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
var global_service_1 = require('../shared/global.service');
var angularfire2_1 = require('angularfire2');
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var SidebarComponent = (function () {
    function SidebarComponent(_elRef, af, router, route, globalService) {
        this._elRef = _elRef;
        this.af = af;
        this.router = router;
        this.route = route;
        this.globalService = globalService;
        this.defaultImg = 'http://cdn.bleedingcool.net/wp-content/uploads/2012/09/sam-bain-twitter-avatar.jpeg';
        this.signOutShowed = false;
        this.width = window.innerWidth;
        var url = '/private/' + localStorage.getItem('uid');
        this.userData = af.database.object(url);
        af.database.object(url).subscribe(function (item) {
            globalService.username = item.username;
        });
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        window.onresize = function () {
            _this.width = window.innerWidth;
            _this.globalService.width = window.innerWidth;
        };
    };
    SidebarComponent.prototype.onSignOut = function () {
        this.af.auth.logout();
        localStorage.setItem('uid', '');
        console.log('navigate');
        this.router.navigate(['/login']);
    };
    SidebarComponent.prototype.onToggle = function () {
        this.globalService.toggle = !this.globalService.toggle;
    };
    SidebarComponent.prototype.onNav = function () {
        this.globalService.navClicked = !this.globalService.navClicked;
    };
    SidebarComponent.prototype.changeProfile = function (newuser, newimg) {
        if (newuser != '') {
            this.globalService.username = newuser;
            this.af.database.object('/private/' + localStorage.getItem('uid')).update({ username: newuser });
        }
        if (newimg != '') {
            this.af.database.object('/private/' + localStorage.getItem('uid')).update({ imgUrl: newimg });
        }
        this.modal.close();
    };
    SidebarComponent.prototype.onClickSignOut = function () {
        this.signOutShowed = !this.signOutShowed;
    };
    SidebarComponent.prototype.navRoute = function (addr) {
        this.router.navigate([addr]);
    };
    __decorate([
        core_1.ViewChild('modal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], SidebarComponent.prototype, "modal", void 0);
    SidebarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-sidebar',
            templateUrl: 'sidebar.component.html',
            styleUrls: ['sidebar.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES, ng2_bs3_modal_1.MODAL_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, angularfire2_1.AngularFire, router_1.Router, router_1.ActivatedRoute, global_service_1.GlobalService])
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map