/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../../services/user-settings.ts" />
/// <reference path="../map/map.ts" />

module snm.maps.components {
    export class LayerPickerController {
        static $inject: string[] = ["$scope", "userSettings"];

        public map: snm.maps.components.Map;
        public mdPanelRef: angular.material.MDPanelRef;

        constructor(private $scope: ng.IScope,
                    private userSettings: snm.services.settings.UserSettings) {
        }

        public useLayer(def: snm.maps.components.BaseLayerDefinition): void {
            this.map.baseLayer = def;
            this.mdPanelRef.hide();
        }
    }
}