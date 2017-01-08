/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../definitions-summary.ts" />

module snm.ops.components {
    class Controller {
        static $inject: string[] = ["$scope"];

        public communes: snm.ops.CommuneSummary[];
        public onSelect: (siteId: number) => void;
        public onCenter: (x: number, y: number) => void;

        constructor(private $scope: ng.IScope) {
        }

        public selectSite(siteId: number): void {
            this.onSelect(siteId);
        }

        public centerOnSite(x: number, y: number): void {
            this.onCenter(x, y);
        }
    }

    // component
    angular.module("snm.ops.components.siteArcheoList", [])
        .component("siteArcheoList", {
            templateUrl: '/app/ops/components/site-archeo-list/site-archeo-list.component.html',
            controller: Controller,
            controllerAs: "vm",
            bindings: {
                communes: "<",
                onSelect: "&",
                onCenter: "&"
            }
        });
}