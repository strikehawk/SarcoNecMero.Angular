﻿/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="nav-menu/nav-menu.component.ts" />
/// <reference path="map/map.component.ts" />

module adunware.snm.components {
	angular.module(adunware.snm.AppConstants.COMPONENTS_MODULE_NAME, [
		"snm.components.navMenu",
		"snm.components.map"
	]);
}