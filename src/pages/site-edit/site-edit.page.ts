/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../../typings/angular-material/angular-material.d.ts" />
/// <reference path="../../common/event-block.ts" />
/// <reference path="../../services/toast-service.ts" />
/// <reference path="../../ops/definitions-details.ts" />
/// <reference path="../../ops/components/site-localisation/site-localisation.component.ts" />
/// <reference path="../../ops/components/site-ops-map/site-ops-map.component.ts" />

module snm.pages {
    import IRoute = angular.route.IRoute;
    import IAngularEvent = angular.IAngularEvent;
    interface IRouteParams extends ng.route.IRouteParamsService {
        siteId: number;
    }

    interface IScope extends ng.IScope {
        siteForm: HTMLFormElement
    }

    // controller
    class Controller {
        static $inject: string[] = ["$scope", "$log", "$http", "$location", "$routeParams", "$mdDialog",
            "userSettings", "toastService"];

        public site: snm.ops.details.SiteArcheo;

        private _eventBlock: adnw.common.EventBlock;

        public get eventBlock(): adnw.common.EventBlock {
            return this._eventBlock;
        }

        private _toastTarget: string = "#content";
        private _originalSite: snm.ops.details.SiteArcheo;
        private _routeChangeHandle: () => void;

        constructor(private $scope: IScope,
                    private $log: ng.ILogService,
                    private $http: ng.IHttpService,
                    private $location: ng.ILocationService,
                    private $routeParams: IRouteParams,
                    private $mdDialog: angular.material.MDDialogService,
                    private userSettings: snm.services.settings.UserSettings,
                    private toastService: snm.services.ToastService) {
            let id: number = $routeParams.siteId;

            this._routeChangeHandle = $scope.$on("$locationChangeStart", (event: IAngularEvent,
                                                                          newUrl: string, oldUrl: string) => {
                this._onRouteChange(event, newUrl, oldUrl);
            });

            $http.get<snm.ops.details.SiteArcheo>("api/ops/sites/" + id)
                .then((result: ng.IHttpPromiseCallbackArg<snm.ops.details.SiteArcheo>) => {
                    this.site = new snm.ops.details.SiteArcheo();
                    this.site.updateFrom(result.data);
                    this._originalSite = this.site.clone();
                });

            this._eventBlock = new adnw.common.EventBlock();
        }

        public save(): void {
            this.toastService.showSimpleMsg(this._toastTarget, "Sauvegarde en cours...", 0);

            this.$http.post<snm.ops.details.SiteArcheo>("api/ops/sites/" + this.site.id, this.site)
                .then((result: ng.IHttpPromiseCallbackArg<snm.ops.details.SiteArcheoData>) => {
                    if ((<any> result.data).messages) {
                        //Error message
                        this.toastService.showErrorSaveMsg(this._toastTarget, (<any> result.data).messages);
                    } else {
                        this.toastService.showSuccessfulSaveMsg(this._toastTarget, "Données enregistrées");

                        this.site = new snm.ops.details.SiteArcheo();
                        this.site.updateFrom(result.data);
                        this._originalSite = this.site.clone();
                    }
                }, (reason: any) => {
                    this.toastService.showErrorSaveMsg(this._toastTarget, reason);
                });
        }

        public cancel(): void {
            let id: number = this.site.id;
            this.site = null;
            this.$location.path("/sites/" + id);
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

        private _onRouteChange(event: IAngularEvent, newUrl: string, oldUrl: string): void {
            if (!this.site) return;
            let isDirty: boolean = !this.site.isEquivalent(this._originalSite);

            //Navigate to newUrl if the form isn't dirty
            if (!isDirty) return;

            this._showConfirm().then(() => {
                //Stop listening for location changes
                this._routeChangeHandle();

                //Go to the requested page
                this.$location.path(newUrl);
            }, () => {
            });

            //Prevent navigation by default since we'll handle it once the user selects a dialog option
            event.preventDefault();
        }

        private _showConfirm(): angular.IPromise<any> {
            let confirm: angular.material.MDConfirmDialog = this.$mdDialog.confirm()
                .title("Vous avez des données non sauvegardées.")
                .textContent("Si vous quittez la page, vous perdrez toutes vos modifications.")
                .ok("Quitter")
                .cancel("Rester");

            return this.$mdDialog.show(confirm)
        }
    }

    // component
    angular.module("snm.pages.siteEditPage", [
            "ngRoute",
            "snm.services.toastService",
            "snm.ops.components.siteLocalisation",
            "snm.ops.components.siteOpsMap"
        ])
        .component("siteEditPage", {
            templateUrl: '/app/pages/site-edit/site-edit.page.html',
            controller: Controller,
            controllerAs: "vm"
        });
}