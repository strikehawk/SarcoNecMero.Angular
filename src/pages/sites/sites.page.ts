/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../ops/definitions-summary.ts" />

module snm.pages {
    // controller
    class Controller {
        static $inject: string[] = ["$scope", "$log", "$http", "$location", "userSettings"];

        public communes: snm.ops.CommuneSummary[];

        constructor(private $scope: ng.IScope,
                    private $log: ng.ILogService,
                    private $http: ng.IHttpService,
                    private $location: ng.ILocationService,
                    private userSettings: snm.services.settings.UserSettings) {
            $http.get<snm.ops.SiteArcheoSummary[]>("api/ops/sites/summary")
                .then((result: ng.IHttpPromiseCallbackArg<snm.ops.SiteArcheoSummary[]>) => {
                    let map: Map<number, snm.ops.CommuneSummary> = new Map<number, snm.ops.CommuneSummary>();
                    let commune: snm.ops.CommuneSummary;

                    result.data.forEach((site: snm.ops.SiteArcheoSummary) => {
                        //Check if CodeCommune is known
                        commune = map.get(site.codeCommune);

                        if (!commune) {
                            //Create a new Commune
                            commune = {
                                code: site.codeCommune,
                                nom: site.commune ? site.commune : "Commune non renseignée",
                                departement: site.departement,
                                sites: []
                            };

                            //Add it to the map
                            map.set(commune.code, commune);
                        }

                        //Add Site to commune
                        site.identifications.forEach((id: snm.ops.IdentificationSite) => {
                            if (id.referentielId === this.userSettings.opsReferentialId) {
                                site.reference = id.reference;
                            }
                        });
                        commune.sites.push(site);
                    });

                    this.communes = [];
                    map.forEach((c: snm.ops.CommuneSummary) => {
                        this.communes.push(c);
                    });
                });
        }

        public onSelectSite(siteId: number): void {
            this.$location.path("/sites/" + siteId);
        }
    }

    // component
    angular.module("snm.pages.sitesPage", [
        "ngRoute",
        "snm.maps.components.map",
        "snm.ops.components.siteArcheoList"]).component("sitesPage", {
        templateUrl: '/app/pages/sites/sites.page.html',
        controller: Controller,
        controllerAs: "vm"
    });
}