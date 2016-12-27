/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="./map/map.component.ts" />
/// <reference path="./map-ol3/map-ol3.component.ts" />

module snm.maps {
	angular.module(adunware.snm.AppConstants.MAPS_MODULE_NAME, [
		"snm.maps.map-ol3",
		"snm.maps.map",
	]);
}