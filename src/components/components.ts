/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="nav-menu/nav-menu.component.ts" />

module adunware.snm.components {
	angular.module(adunware.snm.AppConstants.COMPONENTS_MODULE_NAME, [
		"adunware.snm.components.navMenu"
	]);
}