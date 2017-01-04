/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="./settings/user-settings.ts" />
/// <reference path="./toast-service.ts" />

module snm.services {
	angular.module(snm.AppConstants.SERVICES_MODULE_NAME, [
		"snm.services.dal.dbContext",
		"snm.services.settings",
		"snm.services.toastService"
	]);
}