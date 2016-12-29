/// <reference path="../../../../typings/openlayers/openlayers.d.ts" />
/// <reference path="../../../../typings/proj4/proj4.d.ts" />
/// <reference path="../../../common/event-block.ts" />
/// <reference path="./map.ts" />

module snm.maps.components {
    export class ViewManager {

        private _map: snm.maps.components.Map;
        private _olMap: ol.Map;
        private _eventBlock: adnw.common.EventBlock;

        private _scale: number;

        public get scale(): number {
            return this._scale;
        }

        private _zoom: number;

        public get zoom(): number {
            return this._zoom;
        }

        constructor(map: snm.maps.components.Map, olMap: ol.Map, eventBlock: adnw.common.EventBlock) {
            if (!map) {
                throw new Error("Map cannot be null.");
            }

            if (!olMap) {
                throw new Error("OlMap cannot be null.");
            }

            if (!eventBlock) {
                throw new Error("EventBlock cannot be null.");
            }

            this._map = map;
            this._olMap = olMap;
            this._eventBlock = eventBlock;

            olMap.on("change:view", (ev: any) => {
                //Unregister from previous view
                let oldView: ol.View = ev.oldValue;
                this._unregisterFromViewEvents(oldView);

                //Register to new one
                let view: ol.View = ev.target.get(ev.key);
                this._registerToViewEvents(view);
            });

            this._setupView(olMap.getView());
        }

        private _computeScale(resolution: number, proj: ol.proj.Projection): number {
            let dpi: number = 25.4 / 0.28;
            let scale: number = resolution * proj.getMetersPerUnit() * 39.37 * dpi;

            return scale;
        }

        //region View events
        private _resolutionChangeKey: ol.EventsKey;

        private _registerToViewEvents(view: ol.View): void {
            this._resolutionChangeKey = view.on("change:resolution", (ev: any) => {
                let view: ol.View = ev.target;
                let proj: ol.proj.Projection = view.getProjection();
                let newRes: number = ev.target.get(ev.key);

                let oldScale: number = this._scale;
                this._scale = this._computeScale(newRes, proj);
                this._eventBlock.dispatch("change:scale", oldScale, this._scale);

                let oldZoom: number;
                this._zoom = view.getZoom();
                this._eventBlock.dispatch("change:zoom", oldZoom, this._zoom);
            });
        }

        private _unregisterFromViewEvents(view: ol.View): void {
            if (this._resolutionChangeKey) {
                view.unByKey(this._resolutionChangeKey);
            }
        }

        private _setupView(view: ol.View): void {
            this._registerToViewEvents(view);
            this._scale = this._computeScale(view.getResolution(), view.getProjection());
            this._zoom = view.getZoom();
        }
        //endregion
    }
}
