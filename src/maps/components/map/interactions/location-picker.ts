/// <reference path="../../../../../typings/openlayers/openlayers.d.ts" />

module snm.maps.components {
    export class LocationPicker extends ol.interaction.Interaction {

        private _promise: Promise<ol.Coordinate>;
        private _resolve: (value: ol.Coordinate) => void;
        private _reject: (reason: any) => void;

        public get promise(): Promise<ol.Coordinate> {
            return this._promise;
        }

        constructor() {
            let resolve: (value: ol.Coordinate) => void;
            let reject: (reason: any) => void;

            super({
                handleEvent: (ev: ol.MapBrowserEvent): boolean => {
                    switch (ev.type) {
                        case "pointerup":
                            resolve(ev.coordinate);
                            break;
                        case "keydown":
                            let keyEvent: KeyboardEvent = (<any> ev).originalEvent;
                            let key: string = keyEvent.key;
                            if (key === "Escape") {
                                reject("Cancelled");
                            }
                            break;
                    }

                    return true;
                }
            });

            this._promise = new Promise<ol.Coordinate>(
                (res: (value: ol.Coordinate) => void, rej: (reason: any) => void) => {
                    resolve = res;
                    reject = rej;
                });

            this._resolve = resolve;
            this._reject = reject;
        }

        public handleEvent(ev: ol.MapBrowserEvent): boolean {
            this._resolve(ev.coordinate);
            return true;
        }
    }
}
