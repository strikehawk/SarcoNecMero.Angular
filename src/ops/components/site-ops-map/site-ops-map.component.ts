/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../../../typings/angular-material/angular-material.d.ts" />
/// <reference path="../../../common/event-block.ts" />
/// <reference path="../../definitions-details.ts" />
/// <reference path="../../../services/user-settings.ts" />
/// <reference path="../../../maps/services/icon-service.ts" />

module snm.ops.components {
    // controller
    class Controller {
        static $inject: string[] = ["$scope", "$log", "$mdToast", "userSettings", "iconService"];

        private _site: snm.ops.details.SiteArcheo;

        public get site(): snm.ops.details.SiteArcheo {
            return this._site;
        }

        public set site(value: snm.ops.details.SiteArcheo) {
            this._site = value;

            this._addSiteToMap();
            this._centerOnSite();
        }

        public eventBlock: adnw.common.EventBlock;
        public onPick: (coordinates: any) => void;

        private _map: snm.maps.components.Map;

        public get map(): snm.maps.components.Map {
            return this._map;
        }

        private _siteSource: ol.source.Vector;
        private _siteFeature: ol.Feature;

        constructor(private $scope: ng.IScope,
                    private $log: ng.ILogService,
                    private $mdToast: angular.material.MDToastService,
                    private userSettings: snm.services.settings.UserSettings,
                    private iconService: snm.maps.services.IconService) {
        }

        public $onInit(): void {
            this.eventBlock.on("center", this._onCenter.bind(this));
            this.eventBlock.on("pickLocation", this._onPickLocation.bind(this));
            this.eventBlock.on("refreshLocation", this._onRefreshLocation.bind(this));
        }

        public $postLink(): void {
            setTimeout(() => {
                this._setupMap();

                if (this._site) {
                    this._addSiteToMap();
                    this._centerOnSite();
                }
            });
        }

        public centerOnSite(): void {
            if (!this._map || !this._site) {
                return;
            }

            if (typeof this._site.x !== "number" || typeof this._site.y !== "number") {
                //Site has no location defined
                return;
            }

            this._map.flyTo(this._map.convertToProj([this._site.x, this._site.y]));
        }

        private _setupMap(): void {
            this._map = new snm.maps.components.Map("map", this.userSettings);

            this._siteSource = new ol.source.Vector();
            let siteLayer: ol.layer.Vector = new ol.layer.Vector({
                renderOrder: null,
                source: this._siteSource
            });

            this._map.addLayer(siteLayer);

            this._addSiteToMap();
            this._centerOnSite();
        }

        private _addSiteToMap(): void {
            if (!this._map) {
                return;
            }

            if (!this._siteSource || !this._site) {
                return;
            }

            let coordinates: ol.Coordinate = [this._site.x, this._site.y];
            coordinates = this._map.convertToProj(coordinates);

            if (!this._siteFeature) {
                this._siteFeature = new ol.Feature({
                    geometry: new ol.geom.Point(coordinates)
                });
                this._siteFeature.setStyle(this.iconService.getSiteDetailsStyle(this._site));

                this._siteSource.addFeature(this._siteFeature);
            } else {
                this._siteFeature.setGeometry(new ol.geom.Point(coordinates));
            }
        }

        private _centerOnSite(): void {
            if (!this._map) {
                return;
            }

            if (this._site && typeof this._site.x === "number" && typeof this._site.y === "number") {
                this._map.center = this._map.convertToProj([this._site.x, this._site.y]);
            }
        }

        private _onCenter(oldValue?: ol.Coordinate, newValue?: ol.Coordinate): void {
            if (!this._map) {
                return;
            }

            if (newValue) {
                this._map.flyTo(this._map.convertToProj(newValue));
            }
        }

        private _onPickLocation(oldValue?: any, newValue?: any): void {
            if (!this._map) {
                return;
            }

            //Show toast
            this.$mdToast.show({
                hideDelay: 0,
                position: "top right",
                template: "<md-toast><div class='md-toast-content'>Cliquer pour désigner l'emplacement</div></md-toast>",
                parent: "#map"
            });

            //Create a dispose function to remove the toast
            let dispose: () => void = () => {
                this.$mdToast.hide();
            };

            //Start interaction
            this._map.pickLocation().then((value: ol.Coordinate) => {
                let coordinates: ol.Coordinate = this._map.convertFromProj(value);
                this.onPick({coordinates: coordinates});
                dispose();
            }, (reason: any) => {
                this.$log.debug(reason);
                dispose();
            });
        }

        private _onRefreshLocation(oldValue?: any, newValue?: any): void {
            this._addSiteToMap();
        }
    }

    // component
    angular.module("snm.ops.components.siteOpsMap", [
            "ngRoute",
            "ngMaterial"])
        .component("siteOpsMap", {
            templateUrl: '/app/ops/components/site-ops-map/site-ops-map.component.html',
            controller: Controller,
            controllerAs: "vm",
            bindings: {
                site: "<",
                eventBlock: "<",
                onPick: "&"
            }
        });
}