/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../definitions-summary.ts" />

module snm.ops.components {
    class SiteArcheoListController {
        static $inject: string[] = ["$scope"];

        public communes: snm.ops.CommuneSummary[];
        public onSelect: (siteId: number) => void;

        constructor(private $scope: ng.IScope) {
        }

        public selectSite(siteId: number): void {
            this.onSelect(siteId);
        }
    }

    // component
    angular.module("snm.ops.components.siteArcheoList", [
        "snm.services.dal.dbContext",
        "snm.chrono.components.phases-chronologiques",
        "snm.pers.components.personne"
    ]).component("siteArcheoList", {
        templateUrl: '/app/ops/components/site-archeo-list/site-archeo-list.component.html',
        controller: SiteArcheoListController,
        bindings: {
            communes: "<",
            onSelect: "&"
        }
    });
}