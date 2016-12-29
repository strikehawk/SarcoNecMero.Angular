/// <reference path="../../../../../typings/openlayers/openlayers.d.ts" />
/// <reference path="../map.ts" />

module snm.maps.components {
    export class CursorPosition extends ol.interaction.Pointer {
        private _map: snm.maps.components.Map;

        constructor(map: snm.maps.components.Map) {
            if (!map) {
                throw new Error("Map cannot be null.");
            }

            super({
                handleMoveEvent: (ev: ol.MapBrowserEvent) => {
                    this._map.cursor = this._map.convertFromProj(ev.coordinate);
                    return true;
                }
            });

            this._map = map;
        }
    }
}
