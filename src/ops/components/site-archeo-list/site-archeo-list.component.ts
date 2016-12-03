/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../services/site-archeo.service.ts" />

module adunware.snm.ops.components {
	class SiteArcheoListController {
		static $inject: string[] = ["$scope", "$log", "siteArcheoService"];

		public sites: adunware.snm.ops.ISiteArcheo[];

		constructor(private $scope: ng.IScope, private $log: ng.ILogService, private svc: adunware.snm.ops.ISiteArcheoService) {
			svc.refresh().then(() => {
				this.sites = svc.getAll();
				this.$scope.$applyAsync();
			});
		}
	}

	// component
	angular.module("adunware.snm.ops.components.siteArcheoList", []).component("siteArcheoList", {
		templateUrl: '/app/ops/components/site-archeo-list/site-archeo-list.component.html',
		controller: SiteArcheoListController,
		controllerAs: "vm"
	});
}