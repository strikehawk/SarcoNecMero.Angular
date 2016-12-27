/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../../typings/cesium/cesium.d.ts" />

module adunware.snm.components {
    class Controller {
        private _viewer: Cesium.Viewer;

        constructor() {
            this._createViewer("cesiumContainer");

            //let layers: Cesium.ImageryLayerCollection = this._viewer.imageryLayers;
            //let osm: Cesium.UrlTemplateImageryProvider = Cesium.createOpenStreetMapImageryProvider();
            //layers.addImageryProvider(osm);
        }

        private _getViewerOptions(imageryProviders: Cesium.ProviderViewModel[]): Cesium.IViewerOptions {
            let options: Cesium.IViewerOptions = {
                animation: false,
                baseLayerPicker: true,
                fullscreenButton: false,
                infoBox: false,
                sceneModePicker: false,
                selectionIndicator: false,
                timeline: false,
                navigationHelpButton: false,
                terrainProviderViewModels: []
            };

            if (imageryProviders) {
                options.imageryProviderViewModels = imageryProviders;
            }

            return options;
        }

        private _createViewer(elementId: string): void {
            let osm: Cesium.ProviderViewModel = new Cesium.ProviderViewModel({
                name: "Open\u00adStreet\u00adMap",
                iconUrl: "lib/cesium/Widgets/Images/ImageryProviders/openStreetMap.png",
                tooltip: "OpenStreetMap (OSM) is a collaborative project to create a free editable\nmap of the world.\nhttp://www.openstreetmap.org",
                creationFunction: function () {
                    return Cesium.createOpenStreetMapImageryProvider();
                }
            });

            //Create the list of available providers we would like the user to select from.
            //This example uses 3, OpenStreetMap, The Black Marble, and a single, non-streaming world image.
            let imageryViewModels: Cesium.ProviderViewModel[] = [];
            imageryViewModels.push(osm);

            this._viewer = new Cesium.Viewer(elementId, this._getViewerOptions(imageryViewModels));
        }
    }

    // component
    angular.module("snm.maps.map-cesium", []).component("mapCesium", {
        templateUrl: '/app/maps/map-cesium/map-cesium.component.html',
        controller: Controller,
        controllerAs: "vm"
    });
}