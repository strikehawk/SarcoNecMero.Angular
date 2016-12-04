/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />

module adunware.snm.services {
	angular.module(adunware.snm.AppConstants.SERVICES_MODULE_NAME, [
		"adunware.snm.services.dal.dbContext"
	]);
}