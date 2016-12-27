module snm.services.settings {

    interface DefaultSettings {
        opsReferentialId: number;
    }

    export class UserSettings {
        private _opsReferentialId: number;

        public get opsReferentialId(): number {
            return this._opsReferentialId;
        }

        public set opsReferentialId(value: number) {
            this._opsReferentialId = value;
        }

        constructor(private $http: ng.IHttpService) {
            $http.get<DefaultSettings>("api/settings/default")
                .then((result: ng.IHttpPromiseCallbackArg<DefaultSettings>) => {
                    this._opsReferentialId = result.data.opsReferentialId;
                });
        }
    }
    
    angular.module("snm.services.settings", [])
        .factory("userSettings", ["$http", ($http: ng.IHttpService) => new UserSettings($http)]);
}