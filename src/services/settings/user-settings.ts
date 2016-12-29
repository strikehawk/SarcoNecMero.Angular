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

        constructor(private $http: ng.IHttpService) {
            $http.get<DefaultSettings>("api/settings/default")
                .then((result: ng.IHttpPromiseCallbackArg<DefaultSettings>) => {
                    this._opsReferentialId = result.data.opsReferentialId;
                    this._startZoom = result.data.startZoom;
                    this._homeLocation = result.data.homeLocation;
                });
        }
    }
    
    angular.module("snm.services.settings", [])
        .factory("userSettings", ["$http", ($http: ng.IHttpService) => new UserSettings($http)]);
}