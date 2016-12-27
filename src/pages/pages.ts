/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="main/main.page.ts" />
/// <reference path="sites/sites.page.ts" />
/// <reference path="site-details/site-details.page.ts" />

module adunware.snm.pages {
	angular.module(adunware.snm.AppConstants.PAGES_MODULE_NAME, [
		"snm.pages.layoutPage",
		"snm.pages.mainPage",
		"snm.pages.sitesPage",
		"snm.pages.siteDetailsPage",
		"snm.pages.siteEditPage"
	]);
}