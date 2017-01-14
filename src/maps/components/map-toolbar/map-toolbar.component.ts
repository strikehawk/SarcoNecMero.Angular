/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../../services/user-settings.ts" />
/// <reference path="../map/map.ts" />

module snm.maps.components {
    class Controller {
        static $inject: string[] = ["$scope", "userSettings"];

        private _showScale: boolean = true;

        public get showScale(): boolean {
            return this._showScale;
        }

        public set showScale(value: boolean) {
            this._showScale = value;
        }

        private _map: snm.maps.components.Map;

        public get map(): snm.maps.components.Map {
            return this._map;
        }

        public set map(value: snm.maps.components.Map) {
            this._map = value;
            if (value) {
                this._registerToMapEvents(value);
            }
        }

        public get showHome(): boolean {
            return !!this.goToHome;
        }

        public goToHome: () => void;

        constructor(private $scope: ng.IScope,
                    private userSettings: snm.services.settings.UserSettings) {
        }

        public toggleScale(): void {
            this._showScale = !this._showScale;
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