/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../ops/definitions-details.ts" />

module snm.pages {
    interface IRouteParams extends ng.route.IRouteParamsService {
        siteId: number;
    }

    // controller
    class Controller {
        static $inject: string[] = ["$scope", "$log", "$http", "$location", "userSettings", "$routeParams"];

        public site: snm.ops.details.SiteArcheo;

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
        }

        public edit(): void {
            this.$location.path("/sites/edit/" + this.site.id);
        }
    }

    // component
    angular.module("snm.pages.siteDetailsPage", ["ngRoute"])
        .component("siteDetailsPage", {
            templateUrl: '/app/pages/site-details/site-details.page.html',
            controller: Controller,
            controllerAs: "vm"
        });
}