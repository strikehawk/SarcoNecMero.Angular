/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />

/// <reference path="./components/site-archeo-list/site-archeo-list.component.ts" />

/// <reference path="./services/site-archeo.service.ts" />

module adunware.snm.ops {
	angular.module(adunware.snm.AppConstants.OPS_MODULE_NAME, [
        "adunware.snm.ops.components.siteArcheoList",
		"adunware.snm.ops.services.siteArcheoService"
	]);
}