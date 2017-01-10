/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../common/event-block.ts" />
/// <reference path="../../ops/definitions-details.ts" />
/// <reference path="../../ops/components/site-localisation/site-localisation.component.ts" />
/// <reference path="../../ops/components/site-ops-map/site-ops-map.component.ts" />
/// <reference path="../../sarcos/components/panneaux-site-list/panneaux-site-list.component.ts" />

module snm.pages {
    interface IRouteParams extends ng.route.IRouteParamsService {
        siteId: number;
    }

    // controller
    class Controller {
        static $inject: string[] = ["$scope", "$log", "$http", "$location", "userSettings", "$routeParams"];

        public site: snm.ops.details.SiteArcheo;

        private _eventBlock: adnw.common.EventBlock;

        public get eventBlock(): adnw.common.EventBlock {
            return this._eventBlock;
        }

        constructor(private $scope: ng.IScope,
                    private $log: ng.ILogService,
                    private $http: ng.IHttpService,
                    private $location: ng.ILocationService,
                    private userSettings: snm.services.settings.UserSettings,
                    private $routeParams: IRouteParams) {
            let id: number = $routeParams.siteId;

            $http.get<snm.ops.details.SiteArcheo>("api/ops/sites/" + id)
                .then((result: ng.IHttpPromiseCallbackArg<snm.ops.details.SiteArcheo>) => {
                    this.site = result.data;
                });

            this._eventBlock = new adnw.common.EventBlock();
        }

        public edit(): void {
            this.$location.path("/sites/edit/" + this.site.id);
        }
    }

    // component
    angular.module("snm.pages.siteDetailsPage", [
            "ngRoute",
            "snm.ops.components.siteLocalisation",
            "snm.ops.components.siteOpsMap"
        ])
        .component("siteDetailsPage", {
            templateUrl: '/app/pages/site-details/site-details.page.html',
            controller: Controller,
            controllerAs: "vm"
        });
}