/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../ops/definitions-details.ts" />

module snm.pages {
    import IRoute = angular.route.IRoute;
    interface IRouteParams extends ng.route.IRouteParamsService {
        siteId: number;
    }

    // controller
    class Controller {
        static $inject: string[] = ["$scope", "$log", "$http", "userSettings", "$routeParams"];

        public site: snm.ops.details.SiteArcheo;

        constructor(private $scope: ng.IScope,
                    private $log: ng.ILogService,
                    private $http: ng.IHttpService,
                    private userSettings: snm.services.settings.UserSettings,
                    private $routeParams: IRouteParams) {
            let id: number = $routeParams.siteId;

            $http.get<snm.ops.details.SiteArcheo>("api/ops/sites/" + id)
                .then((result: ng.IHttpPromiseCallbackArg<snm.ops.details.SiteArcheo>) => {
                    this.site = result.data;
                });
        }
    }

    // component
    angular.module("snm.pages.siteEditPage", ["ngRoute"])
        .component("siteEditPage", {
            templateUrl: '/app/pages/site-edit/site-edit.page.html',
            controller: Controller,
            controllerAs: "vm"
        });
}