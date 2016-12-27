﻿/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="./settings/user-settings.ts" />

module adunware.snm.services {
	angular.module(adunware.snm.AppConstants.SERVICES_MODULE_NAME, [
		"snm.services.dal.dbContext",
		"snm.services.settings"
	]);
}