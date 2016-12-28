/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../../typings/openlayers/openlayers.d.ts" />
/// <reference path="../../../typings/proj4/proj4.d.ts" />

module adunware.snm.components {
    class Controller {
        constructor() {
            this._loadProjections();
            this._createMap("map-ol3");
        }

        private _createMap(elementId: string): void {
            let view: ol.View = new ol.View({
                projection: "EPSG:2154",
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

        private _loadProjections(): void {
            proj4.defs("EPSG:2154", "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
        }
    }

    // component
    angular.module("snm.maps.map-ol3", []).component("mapOl3", {
        templateUrl: '/app/maps/map-ol3/map-ol3.component.html',
        controller: Controller,
        controllerAs: "vm"
    });
}