/// <reference path="../../../typings/angular/angular.d.ts" />

module adunware.snm.components {
    class Controller {

        constructor() {
        }
    }

    // component
    angular.module("snm.components.map", []).component("map", {
        templateUrl: '/app/components/map/map.component.html',
        controller: Controller,
        controllerAs: "vm"
    });
}