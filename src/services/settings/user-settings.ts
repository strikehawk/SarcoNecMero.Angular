/// <reference path="../../../typings/angular/angular.d.ts" />

module snm.services.settings {

    interface DefaultSettings {
        /**
         * The Id of the Referential to use when displaying Sites or Operations.
         */
        opsReferentialId: number;

        /**
         * The starting zoom level of the map.
         */
        startZoom: number;

        /**
         * The starting center of the map, in EPSG:2154.
         */
        homeLocation: [number, number];
    }

    export class UserSettings {
        public static defaultSettings: DefaultSettings;

        public static fetchSettings($http: ng.IHttpService): ng.IHttpPromise<DefaultSettings> {
            return $http.get<DefaultSettings>("api/settings/default")
                .then<DefaultSettings>((result: ng.IHttpPromiseCallbackArg<DefaultSettings>) => {
                    UserSettings.defaultSettings = result.data;

                    return result.data;
                });
        }

        private _opsReferentialId: number;

        /**
         * The Id of the Referential to use when displaying Sites or Operations.
         */
        public get opsReferentialId(): number {
            return this._opsReferentialId;
        }

        public set opsReferentialId(value: number) {
            this._opsReferentialId = value;
        }

        private _startZoom: number;

        /**
         * The starting zoom level of the map.
         */
        public get startZoom(): number {
            return this._startZoom;
        }

        public set startZoom(value: number) {
            this._startZoom = value;
        }

        private _homeLocation: [number, number];

        /**
         * The starting center of the map, in EPSG:2154.
         */
        public get homeLocation(): [number, number] {
            return this._homeLocation;
        }

        public set homeLocation(value: [number, number]) {
            this._homeLocation = value;
        }

        constructor() {
            if (UserSettings.defaultSettings) {
                this._opsReferentialId = UserSettings.defaultSettings.opsReferentialId;
                this._startZoom = UserSettings.defaultSettings.startZoom;
                this._homeLocation = UserSettings.defaultSettings.homeLocation;
            }
        }
    }
    
    angular.module("snm.services.settings", [])
        .factory("userSettings", () => new UserSettings());
}