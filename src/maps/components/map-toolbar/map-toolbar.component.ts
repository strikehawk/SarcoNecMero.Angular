/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../../../typings/angular-material/angular-material.d.ts" />
/// <reference path="../../../services/user-settings.ts" />
/// <reference path="../map/map.ts" />
/// <reference path="../layer-picker/layer-picker.component.ts" />

module snm.maps.components {
    class Controller {
        static $inject: string[] = ["$scope", "$mdPanel", "userSettings"];

        private _showScale: boolean = true;

        public get showScale(): boolean {
            return this._showScale;
        }

        public set showScale(value: boolean) {
            this._showScale = value;
        }

        public map: snm.maps.components.Map;

        public get showHome(): boolean {
            return !!this.goToHome;
        }

        public goToHome: () => void;

        constructor(private $scope: ng.IScope,
                    private $mdPanel: angular.material.MDPanelService,
                    private userSettings: snm.services.settings.UserSettings) {
        }

        public $onInit(): void {
            this._registerToMapEvents(this.map);
        }

        public toggleScale(): void {
            this._showScale = !this._showScale;
        }

        public openLayerPicker(): void {
            let panelPosition: angular.material.MDPanelPosition = this.$mdPanel.newPanelPosition()
                .relativeTo("#layer-picker")
                .addPanelPosition(this.$mdPanel.xPosition.ALIGN_START, this.$mdPanel.yPosition.ABOVE);

            let config: angular.material.MDPanelConfig = {
                attachTo: angular.element(document.body),
                templateUrl: "/app/maps/components/layer-picker/layer-picker.component.html",
                controller: snm.maps.components.LayerPickerController,
                controllerAs: "vm",
                position: panelPosition,
                clickOutsideToClose: true,
                escapeToClose: true,
                focusOnOpen: true,
                locals: {
                    map: this.map
                }
            };

            let panelRef: angular.material.MDPanelRef;

            this.$mdPanel.open(config)
                .then(function(result: angular.material.MDPanelRef) {
                    panelRef = result;
                });
        }

        private _registerToMapEvents(map: snm.maps.components.Map): void {
            if (!map) {
                throw new Error("Map cannot be null.");
            }

            map.on("change:scale", () => {
                this._onChange();
            });
            map.on("change:zoom", (oldValue: number, newValue: number) => {
                if (this.userSettings) {
                    this.userSettings.currentZoom = newValue;
                }

                this._onChange();
            });
            map.on("change:cursorPosition", () => {
                this._onChange();
            });

            map.on("change:center", (oldValue: [number, number], newValue: [number, number]) => {
                if (this.userSettings) {
                    this.userSettings.currentLocation = newValue;
                }

                this._onChange();
            });
        }

        private _onChange(oldValue?: any, newValue?: any): void {
            if (!this.$scope) {
                return;
            }

            this.$scope.$applyAsync();
        }
    }

    // component
    angular.module("snm.maps.components.map-toolbar", [
        "snm.services.settings"
    ]).component("mapToolbar", {
        templateUrl: "/app/maps/components/map-toolbar/map-toolbar.component.html",
        controller: Controller,
        controllerAs: "vm",
        bindings: {
            map: "<",
            goToHome: "&?"
        }
    });
}