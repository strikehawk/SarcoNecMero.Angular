/// <reference path="../../../typings/angular/angular.d.ts" />

module adunware.snm.components {
    class Controller {
        public currentNavItem: string;

        constructor() {
            this.currentNavItem = "home";
        }
    }

    // component
    angular.module("snm.components.navMenu", []).component("navMenu", {
        templateUrl: '/app/components/nav-menu/nav-menu.component.html',
        controller: Controller,
        controllerAs: "vm"
    });
}