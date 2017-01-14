/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../../common/event-block.ts" />
/// <reference path="../../definitions-details.ts" />

module snm.ops.components {
    // controller
    class Controller {
        static $inject: string[] = ["$scope", "$log", "userSettings"];

        public site: snm.ops.details.SiteArcheo;

        public get localisation(): string {
            if (!this.site || !this.site.commune) {
                return "Non renseigné";
            } else {
                return `${this.site.commune}
                        ${typeof this.site.departement === "number" ? " (" + this.site.departement + ")" : ""}`;
            }
        }

        public get coordinates(): string {
            if (!this.site || typeof this.site.x !== "number" || typeof this.site.y !== "number") {
                return "Non renseigné";
            } else {
                return `X: ${this.site.x.toLocaleString("fr-FR", {minimumFractionDigits: 0})} 
                        Y: ${this.site.y.toLocaleString("fr-FR", {minimumFractionDigits: 0})}`;
            }
        }

        public allowEdition: boolean;
        public eventBlock: adnw.common.EventBlock;

        constructor(private $scope: ng.IScope,
                    private $log: ng.ILogService,
                    private userSettings: snm.services.settings.UserSettings) {
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