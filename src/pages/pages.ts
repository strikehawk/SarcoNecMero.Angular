/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="layout/layout.page.ts" />
/// <reference path="main/main.page.ts" />
/// <reference path="sites/sites.page.ts" />
/// <reference path="site-details/site-details.page.ts" />
/// <reference path="site-edit/site-edit.page.ts" />

module snm.pages {
	angular.module(snm.AppConstants.PAGES_MODULE_NAME, [
		"snm.pages.layoutPage",
		"snm.pages.mainPage",
		"snm.pages.sitesPage",
		"snm.pages.siteDetailsPage",
		"snm.pages.siteEditPage"
	]);
}