/// <reference path="../../../typings/angular/angular.d.ts" />

module snm.pages {
    // controller
    class Controller {
        constructor() {
        }
    }

    // component
    angular.module("snm.pages.layoutPage", [
        "ngRoute",
        "snm.components.navMenu"]).component("layoutPage", {
        templateUrl: '/app/pages/layout/layout.page.html',
        controller: Controller,
        controllerAs: "vm"
    });
}