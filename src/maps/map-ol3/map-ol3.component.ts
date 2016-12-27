/// <reference path="../../../typings/angular/angular.d.ts" />

module adunware.snm.components {
    class Controller {
        constructor() {
            this._createMap("map-ol3");
        }

        private _createMap(elementId: string): void {
        }
    }

    // component
    angular.module("snm.maps.map-ol3", []).component("mapOL3", {
        templateUrl: '/app/maps/map-ol3/map-ol3.component.html',
        controller: Controller,
        controllerAs: "vm"
    });
}