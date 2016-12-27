/// <reference path="../../../typings/angular/angular.d.ts" />

module snm.pages {
	// controller
	class Controller {
		constructor() {
		}
	}

	// component
	angular.module("snm.pages.mainPage", [
		"ngRoute"]).component("mainPage", {
		templateUrl: '/app/pages/main/main.page.html',
		controller: Controller,
		controllerAs: "vm"
	});
}