/// <reference path="../../../typings/angular/angular.d.ts" />

module adunware.snm.pages {
	// controller
	class MainController {
		constructor() {
			console.log("Alive Main");
		}
	}

	// component
	angular.module("adunware.snm.pages.mainPage", ["ngRoute", "adunware.snm.ops.components.siteArcheoList"]).component("mainPage", {
		templateUrl: '/app/pages/main/main.page.html',
		controller: MainController,
		controllerAs: "vm"
	});
}