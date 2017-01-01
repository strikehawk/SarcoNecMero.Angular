/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../../common/event-block.ts" />
/// <reference path="../../definitions-details.ts" />

module snm.ops.components {
    // controller
    class Controller {
        static $inject: string[] = ["$scope", "$log", "userSettings"];

        public site: snm.ops.details.SiteArcheo;
        public allowEdition: boolean;
        public eventBlock: adnw.common.EventBlock;

        constructor(private $scope: ng.IScope,
                    private $log: ng.ILogService,
                    private userSettings: snm.services.settings.UserSettings) {
        }

        public centerOnLocation(): void {
            this.eventBlock.dispatch("center", null, [this.site.x, this.site.y]);
        }

        public pickLocation(): void {
            this.eventBlock.dispatch("pickLocation");
        }
    }

    // component
    angular.module("snm.ops.components.siteLocalisation", ["ngRoute"])
        .component("siteLocalisation", {
            templateUrl: '/app/ops/components/site-localisation/site-localisation.component.html',
            controller: Controller,
            controllerAs: "vm",
            bindings: {
                site: "<",
                allowEdition: "=",
                eventBlock: "<"
            }
        });
}