/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../../../typings/angular-material/angular-material.d.ts" />
/// <reference path="../../definitions-summary.ts" />
/// <reference path="../../../services/user-settings.ts" />

module snm.sarcos.components {
    // controller
    class Controller {
        static $inject: string[] = ["$scope", "$log", "$http", "$mdToast", "userSettings"];

        private _siteId: number;

        public get siteId(): number {
            return this._siteId;
        }

        public set siteId(value: number) {
            this._siteId = value;

            if (typeof value === "number") {
                this._getSitesData(value);
            }
        }

        private _illustrations: snm.sarcos.IllustrationPanneauSummary[];

        public get illustrations(): snm.sarcos.IllustrationPanneauSummary[] {
            return this._illustrations;
        }

        public set illustrations(value: snm.sarcos.IllustrationPanneauSummary[]) {
            this._illustrations = value;
        }

        constructor(private $scope: ng.IScope,
                    private $log: ng.ILogService,
                    private $http: ng.IHttpService,
                    private $mdToast: angular.material.MDToastService,
                    private userSettings: snm.services.settings.UserSettings) {
        }


        private _getSitesData(siteId: number): void {
            this.$http.get<snm.sarcos.IllustrationPanneauSummary[]>("api/sarcos/" + siteId + "/panneaux/illus/summary")
                .then((result: ng.IHttpPromiseCallbackArg<snm.sarcos.IllustrationPanneauSummary[]>) => {

                    result.data.forEach((ips: snm.sarcos.IllustrationPanneauSummary) => {
                        if (ips.chemin) {
                            ips.label = ips.chemin;
                            ips.chemin = this.userSettings.illustrationStorageRootUrl +
                                "/sarcos/" + siteId + "/" + ips.chemin;
                        }
                    });

                    this.illustrations = result.data;
                });
        }
    }

    // component
    angular.module("snm.sarcos.components.panneauxSiteList", [
            "ngRoute",
            "ngMaterial"])
        .component("panneauxSiteList", {
            templateUrl: '/app/sarcos/components/panneaux-site-list/panneaux-site-list.component.html',
            controller: Controller,
            controllerAs: "vm",
            bindings: {
                siteId: "<"
            }
        });
}