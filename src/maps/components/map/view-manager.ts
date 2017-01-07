/// <reference path="../../../../typings/openlayers/openlayers.d.ts" />
/// <reference path="../../../../typings/proj4/proj4.d.ts" />
/// <reference path="../../../common/event-block.ts" />
/// <reference path="./map.ts" />

module snm.maps.components {
    export class ViewManager {

        private _map: snm.maps.components.Map;
        private _olMap: ol.Map;
        private _eventBlock: adnw.common.EventBlock;

        private _center: [number, number];

        public get center(): [number, number] {
            return this._center;
        }

        public set center(value: [number, number]) {
            this._center = value;
            this._olMap.getView().setCenter(value);
        }

        private _scale: number;

        public get scale(): number {
            return this._scale;
        }

        private _zoom: number;

        public get zoom(): number {
            return this._zoom;
        }

        public set zoom(value: number) {
            this._zoom = value;
            this._olMap.getView().setZoom(value);
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

        public flyTo(coordinates: ol.Coordinate, done?: (complete: boolean) => void): void {
            let view: ol.View = this._olMap.getView();
            let duration: number = 2000;
            let zoom: number = view.getZoom();
            let parts: number = 2;
            let called = false;

            let callback: (complete: boolean) => void = (complete: boolean) => {
                --parts;
                if (called) {
                    return;
                }
                if (parts === 0 || !complete) {
                    called = true;

                    if (done) {
                        done(complete);
                    }
                }
            };

            view.animate({
                center: coordinates,
                duration: duration
            }, callback);
            view.animate({
                zoom: zoom - 1,
                duration: duration / 2
            }, {
                zoom: zoom,
                duration: duration / 2
            }, callback);
        }

        private _computeScale(resolution: number, proj: ol.proj.Projection): number {
            let dpi: number = 25.4 / 0.28;
            let scale: number = resolution * proj.getMetersPerUnit() * 39.37 * dpi;

            return scale;
        }

        //region View events
        private _resolutionChangeKey: ol.EventsKey;
        private _centerChangeKey: ol.EventsKey;

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

            this._centerChangeKey = view.on("change:center", (ev: any) => {
                let oldCenter: [number, number] = this._center;
                let newCenter: [number, number] = ev.target.get(ev.key);

                this._center = newCenter;
                this._eventBlock.dispatch("change:center", oldCenter, newCenter);
            });
        }

        private _unregisterFromViewEvents(view: ol.View): void {
            if (this._resolutionChangeKey) {
                view.unByKey(this._resolutionChangeKey);
            }

            if (this._centerChangeKey) {
                view.unByKey(this._centerChangeKey);
            }
        }

        private _setupView(view: ol.View): void {
            this._registerToViewEvents(view);
            this._center = view.getCenter();
            this._scale = this._computeScale(view.getResolution(), view.getProjection());
            this._zoom = view.getZoom();
        }
        //endregion
    }
}
