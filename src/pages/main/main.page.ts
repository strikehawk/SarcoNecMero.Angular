/// <reference path="../../../typings/angular/angular.d.ts" />

module snm.pages {
	// controller
	class MainController {
		constructor() {
			console.log("Alive Main");
		}
	}

	// component
	angular.module("snm.pages.mainPage", [
		"ngRoute",
		"snm.ops.components.siteArcheoList"]).component("mainPage", {
		templateUrl: '/app/pages/main/main.page.html',
		controller: MainController,
		controllerAs: "vm"
	});
}