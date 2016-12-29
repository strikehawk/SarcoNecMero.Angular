/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="./components/map/map.component.ts" />
/// <reference path="./components/map-ol3/map-ol3.component.ts" />
/// <reference path="./components/map-toolbar/map-toolbar.component.ts" />

module snm.maps {
	angular.module(adunware.snm.AppConstants.MAPS_MODULE_NAME, [
		"snm.maps.components.map-ol3",
		"snm.maps.components.map-toolbar",
		"snm.maps.components.map",
	]);
}