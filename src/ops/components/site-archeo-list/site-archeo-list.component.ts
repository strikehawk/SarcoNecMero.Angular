/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../services/site-archeo.service.ts" />
/// <reference path="../../../services/dal/db-context.ts" />
/// <reference path="../../../pers/dal/personne-set.ts" />

module snm.ops.components {
	class SiteArcheoListController {
		static $inject: string[] = ["$scope", "$log", "siteArcheoService", "dbContext"];

		public sites: snm.ops.ISiteArcheo[];

		constructor(private $scope: ng.IScope,
					private $log: ng.ILogService,
					private svc: snm.ops.ISiteArcheoService,
					private dbContext: snm.services.dal.DbContext) {
			svc.refresh().then(() => {
				this.sites = svc.getAll();
				this.$scope.$applyAsync();
			});

			let repoPersonne: snm.pers.IPersonneSet =
                <snm.pers.IPersonneSet> dbContext.getRepository("Personne");
			repoPersonne.refresh().then(() => {
                let p: snm.pers.IPersonne = repoPersonne.getByKey(1);
            });
		}
	}

	// component
	angular.module("adunware.snm.ops.components.siteArcheoList", [
		"adunware.snm.services.dal.dbContext"
	]).component("siteArcheoList", {
		templateUrl: '/app/ops/components/site-archeo-list/site-archeo-list.component.html',
		controller: SiteArcheoListController,
		controllerAs: "vm"
	});
}