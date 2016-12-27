/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../map-ol3/map-ol3.component.ts" />

module adunware.snm.components {
    class Controller {

        constructor() {
        }
    }

    // component
    angular.module("snm.maps.map", [
        "snm.maps.map-ol3"
    ]).component("map", {
        templateUrl: '/app/maps/map/map.component.html',
        controller: Controller,
        controllerAs: "vm"
    });
}