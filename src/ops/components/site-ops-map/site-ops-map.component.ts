/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../../../typings/angular-material/angular-material.d.ts" />
/// <reference path="../../../common/event-block.ts" />
/// <reference path="../../definitions-details.ts" />

module snm.ops.components {
    // controller
    class Controller {
        static $inject: string[] = ["$scope", "$log", "userSettings", "$mdToast"];

        public site: snm.ops.details.SiteArcheo;
        public eventBlock: adnw.common.EventBlock;
        public onPick: (coordinates: any) => void;

        private _map: snm.maps.components.Map;

        public get map(): snm.maps.components.Map {
            return this._map;
        }

        constructor(private $scope: ng.IScope,
                    private $log: ng.ILogService,
                    private userSettings: snm.services.settings.UserSettings,
                    private $mdToast: angular.material.MDToastService) {
        }

        public $postLink(): void {
            setTimeout(() => this._setupMap());

            if (this.eventBlock) {
                this.eventBlock.on("center", this._onCenter.bind(this));
                this.eventBlock.on("pickLocation", this._onPickLocation.bind(this));
            }
        }

        private _setupMap(): void {
            this._map = new snm.maps.components.Map("map", this.userSettings);
        }

        private _onCenter(oldValue?: ol.Coordinate, newValue?: ol.Coordinate): void {
            if (newValue) {
                this._map.flyTo(this._map.convertToProj(newValue));
            }
        }

        private _onPickLocation(oldValue?: any, newValue?: any): void {
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
                this.onPick({coordinates: this._map.convertFromProj(value)});
                dispose();
            }, (reason: any) => {
                this.$log.debug(reason);
                dispose();
            });
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