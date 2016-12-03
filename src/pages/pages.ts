/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="main/main.page.ts" />

module adunware.snm.pages {
	angular.module(adunware.snm.AppConstants.PAGES_MODULE_NAME, [
		"adunware.snm.pages.mainPage"
	]);
}