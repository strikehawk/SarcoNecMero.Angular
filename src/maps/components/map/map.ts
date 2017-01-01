/// <reference path="../../../../typings/openlayers/openlayers.d.ts" />
/// <reference path="../../../../typings/proj4/proj4.d.ts" />
/// <reference path="../../../common/event-block.ts" />
/// <reference path="./view-manager.ts" />
/// <reference path="./interactions/cursor-position.ts" />
/// <reference path="./interactions/location-picker.ts" />
/// <reference path="../../../services/settings/user-settings.ts" />

module snm.maps.components {
    export class Map {
        public static loadProjections(): void {
            proj4.defs("EPSG:2154", "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
        }

        private _PROJ: string = "EPSG:3857";
        private _DATA_PROJ: string = "EPSG:2154";
        private _map: ol.Map;
        private _viewManager: snm.maps.components.ViewManager;
        private _eventBlock: adnw.common.EventBlock;

        public get scale(): number {
            return this._viewManager.scale;
        }

        public get zoom(): number {
            return this._viewManager.zoom;
        }

        private _cursor: [number, number];

        /**
         * Current cursor position, in EPSG:2154.
         */
        public get cursor(): [number, number] {
            return this._cursor;
        }

        public set cursor(value: [number, number]) {
            let oldValue: [number, number] = this._cursor;
            this._cursor = value;
            this._eventBlock.dispatch("change:cursorPosition", oldValue, value);
        }

        constructor(elementId: string, private userSettings: snm.services.settings.UserSettings) {
            Map.loadProjections();
            this._map = this._createMap(elementId);
            this._eventBlock = new adnw.common.EventBlock();
            this._viewManager = new snm.maps.components.ViewManager(this, this._map, this._eventBlock);
        }

        /**
         * Convert from DATA_PROJ (EPSG:2154) to PROJ (EPSG:3857).
         * @param coordinates The coordinates to convert.
         */
        public convertToProj(coordinates: ol.Coordinate): ol.Coordinate {
            return proj4<ol.Coordinate>(this._DATA_PROJ, this._PROJ, coordinates);
        }

        /**
         * Convert from PROJ (EPSG:3857) to DATA_PROJ (EPSG:2154).
         * @param coordinates The coordinates to convert.
         */
        public convertFromProj(coordinates: ol.Coordinate): ol.Coordinate {
            return proj4<ol.Coordinate>(this._PROJ, this._DATA_PROJ, coordinates);
        }

        public flyTo(coordinates: ol.Coordinate, done?: (complete: boolean) => void): void {
            this._viewManager.flyTo(coordinates, done);
        }

        public pickLocation(): Promise<ol.Coordinate> {
            let picker: LocationPicker = new LocationPicker();

            this._map.addInteraction(picker);
            picker.promise.then(() => {
                this._map.removeInteraction(picker);
            }, () => {
                this._map.removeInteraction(picker);
            });

            return picker.promise;
        }

        public on(event: string, callback: adnw.common.EventCallback<any>): void {
            if (!event) {
                throw new Error("Event cannot be empty.");
            }

            if (!callback) {
                throw new Error("Callback cannot be null.");
            }

            this._eventBlock.on(event, callback);
        }

        public un(event: string, callback: adnw.common.EventCallback<any>): void {
            if (!event) {
                throw new Error("Event cannot be empty.");
            }

            if (!callback) {
                throw new Error("Callback cannot be null.");
            }

            this._eventBlock.un(event, callback);
        }

        private _createMap(elementId: string): ol.Map {
            let view: ol.View = new ol.View({
                projection: this._PROJ,
                center: this.userSettings.homeLocation ? this.convertToProj(this.userSettings.homeLocation) : [0, 0],
                zoom: this.userSettings.startZoom ? this.userSettings.startZoom : 1
            });

            let layers: ol.layer.Base[] = [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ];

            let map: ol.Map = new ol.Map({
                target: elementId,
                loadTilesWhileAnimating: true,
                view: view,
                layers: layers,
                interactions: ol.interaction.defaults().extend([new snm.maps.components.CursorPosition(this)])
            });

            setTimeout(() => {
                map.updateSize();
            });

            return map;
        }
    }
}
