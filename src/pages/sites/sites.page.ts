/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../ops/definitions-summary.ts" />
/// <reference path="../../maps/components/map/map.ts" />
/// <reference path="../../maps/components/map-toolbar/map-toolbar.component.ts" />
/// <reference path="../../maps/services/icon-service.ts" />

module snm.pages {
    // controller
    class Controller {
        static $inject: string[] = ["$scope", "$log", "$http", "$location", "userSettings", "iconService"];

        public communes: snm.ops.CommuneSummary[];

        private _map: snm.maps.components.Map;

        public get map(): snm.maps.components.Map {
            return this._map;
        }

        private _siteSource: ol.source.Vector;

        constructor(private $scope: ng.IScope,
                    private $log: ng.ILogService,
                    private $http: ng.IHttpService,
                    private $location: ng.ILocationService,
                    private userSettings: snm.services.settings.UserSettings,
                    private iconService: snm.maps.services.IconService) {
            this._getSitesData();
        }

        public $postLink(): void {
            setTimeout(() => this._setupMap());
        }

        public flyToHome(): void {
            let home: ol.Coordinate = this._map.convertToProj(this.userSettings.homeLocation);
            this._map.flyTo(home, () => {
                this.$scope.$apply();
            });
        }

        public onSelectSite(siteId: number): void {
            this.$location.path("/sites/" + siteId);
        }

        public onCenterOnSite(x: number, y: number): void {
            if (!this._map) {
                return;
            }

            let coordinates: ol.Coordinate = this._map.convertToProj([x, y]);
            this._map.flyTo(coordinates);
        }

        private _setupMap(): void {
            this._map = new snm.maps.components.Map("map", this.userSettings);

            this._siteSource = new ol.source.Vector();
            let siteLayer: ol.layer.Vector = new ol.layer.Vector({
                renderOrder: null,
                source: this._siteSource
            });

            this._map.addLayer(siteLayer);

            //Try to display sites, if they're already present
            this._displaySitesOnMap();
        }

        private _getSitesData(): void {
            this.$http.get<snm.ops.SiteArcheoSummary[]>("api/ops/sites/summary")
                .then((result: ng.IHttpPromiseCallbackArg<snm.ops.SiteArcheoSummary[]>) => {
                    let map: Map<number, snm.ops.CommuneSummary> = new Map<number, snm.ops.CommuneSummary>();
                    let commune: snm.ops.CommuneSummary;

                    //Clear site source if it exists
                    if (this._siteSource) {
                        this._siteSource.clear();
                    }

                    result.data.forEach((site: snm.ops.SiteArcheoSummary) => {
                        //Try to add site to map
                        this._addSiteToMap(site);

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

        private _addSiteToMap(site: snm.ops.SiteArcheoSummary): void {
            if (!this._map) {
                return;
            }

            if (!this._siteSource || !site) {
                return;
            }

            if (typeof site.x !== "number" || typeof site.y !== "number") {
                //Cannot display site without coordinates
                return;
            }

            let coordinates: ol.Coordinate = [site.x, site.y];
            coordinates = this._map.convertToProj(coordinates);

            let siteFeature: ol.Feature = new ol.Feature({
                geometry: new ol.geom.Point(coordinates)
            });
            siteFeature.setStyle(this.iconService.getSiteSummaryStyle(site));

            this._siteSource.addFeature(siteFeature);
        }

        private _displaySitesOnMap() {
            if (!this._map || !this.communes) {
                return;
            }

            this.communes.forEach((c: snm.ops.CommuneSummary) => {
                if (c.sites) {
                    c.sites.forEach((s: snm.ops.SiteArcheoSummary) => {
                        //Try to add site to map
                        this._addSiteToMap(s);
                    });
                }
            });
        }
    }

    // component
    angular.module("snm.pages.sitesPage", [
        "ngRoute",
        "snm.maps.components.map-toolbar",
        "snm.maps.services.iconService",
        "snm.ops.components.siteArcheoList"]).component("sitesPage", {
        templateUrl: '/app/pages/sites/sites.page.html',
        controller: Controller,
        controllerAs: "vm"
    });
}