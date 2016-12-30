/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="nav-menu/nav-menu.component.ts" />

module snm.components {
	angular.module(snm.AppConstants.COMPONENTS_MODULE_NAME, [
		"snm.components.navMenu"
	]);
}