/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../../typings/openlayers/openlayers.d.ts" />

module adunware.snm.components {
    class Controller {
        constructor() {
            this._createMap("map-ol3");
        }

        private _createMap(elementId: string): void {
            let view: ol.View = new ol.View({
                center: [0, 0],
                zoom: 1
            });

            let layers: ol.layer.Base[] = [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ];

            new ol.Map({
                target: elementId,
                view: view,
                layers: layers
            })
        }
    }

    // component
    angular.module("snm.maps.map-ol3", []).component("mapOl3", {
        templateUrl: '/app/maps/map-ol3/map-ol3.component.html',
        controller: Controller,
        controllerAs: "vm"
    });
}