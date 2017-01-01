/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../../typings/angular-material/angular-material.d.ts" />
/// <reference path="../../common/event-block.ts" />
/// <reference path="../../ops/definitions-details.ts" />
/// <reference path="../../ops/components/site-localisation/site-localisation.component.ts" />
/// <reference path="../../ops/components/site-ops-map/site-ops-map.component.ts" />

module snm.pages {
    import IRoute = angular.route.IRoute;
    interface IRouteParams extends ng.route.IRouteParamsService {
        siteId: number;
    }

    // controller
    class Controller {
        static $inject: string[] = ["$scope", "$log", "$http", "$location", "$mdToast", "userSettings", "$routeParams"];

        public site: snm.ops.details.SiteArcheo;

        private _eventBlock: adnw.common.EventBlock;

        public get eventBlock(): adnw.common.EventBlock {
            return this._eventBlock;
        }

        constructor(private $scope: ng.IScope,
                    private $log: ng.ILogService,
                    private $http: ng.IHttpService,
                    private $location: ng.ILocationService,
                    private $mdToast: angular.material.MDToastService,
                    private userSettings: snm.services.settings.UserSettings,
                    private $routeParams: IRouteParams) {
            let id: number = $routeParams.siteId;

            $http.get<snm.ops.details.SiteArcheo>("api/ops/sites/" + id)
                .then((result: ng.IHttpPromiseCallbackArg<snm.ops.details.SiteArcheo>) => {
                    this.site = result.data;
                });

            this._eventBlock = new adnw.common.EventBlock();
        }

        public save(): void {
            this.$http.post<snm.ops.details.SiteArcheo>("api/ops/sites/" + this.site.id, this.site)
                .then((result: ng.IHttpPromiseCallbackArg<snm.ops.details.SiteArcheo>) => {
                    this._showSuccessfulSaveMsg("Données enregistrées");
                    this.site = result.data;
                }, (reason: any) => {
                    this._showErrorSaveMsg(reason);
                });
        }

        public cancel(): void {
            this.$location.path("/sites/" + this.site.id);
        }

        public onPickLocation(coordinates: ol.Coordinate): void {
            let x: number = ~~coordinates[0];
            let y: number = ~~coordinates[1];

            //Get commune containing the coordinates
            this.$http.get<snm.ops.details.Commune>("api/ops/common/commune/coords?x=" + x + "&y=" + y)
                .then((result: ng.IHttpPromiseCallbackArg<snm.ops.details.Commune>) => {
                    let commune: snm.ops.details.Commune = result.data;
                    this.site.x = x;
                    this.site.y = y;

                    if (commune) {
                        this.site.codeCommune = commune.code;
                        this.site.commune = commune.nom;
                        this.site.departement = commune.departement;
                    }
                });
        }

        private _showSuccessfulSaveMsg(msg: string): void {
            this.$mdToast.show({
                position: "bottom right",
                template: "<md-toast><div class='md-toast-content'><md-icon md-svg-src='assets/img/ic_done_24px.svg' class='s24 md-primary toast-icon' aria-label='Done'></md-icon><span>" + msg + "</span></div></md-toast>",
                parent: "#content"
            });
        }

        private _showErrorSaveMsg(msg: string): void {
            this.$mdToast.show({
                position: "bottom right",
                template: "<md-toast><div class='md-toast-content'><md-icon md-svg-src='assets/img/ic_report_problem_24px.svg' class='s24 md-warn toast-icon' aria-label='Error'></md-icon><span>" + msg + "</span></div></md-toast>",
                parent: "#content"
            });
        }
    }

    // component
    angular.module("snm.pages.siteEditPage", [
            "ngRoute",
            "snm.ops.components.siteLocalisation",
            "snm.ops.components.siteOpsMap"
        ])
        .component("siteEditPage", {
            templateUrl: '/app/pages/site-edit/site-edit.page.html',
            controller: Controller,
            controllerAs: "vm"
        });
}