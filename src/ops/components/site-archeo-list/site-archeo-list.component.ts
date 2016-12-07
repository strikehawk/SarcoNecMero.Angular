/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../../services/dal/db-context.ts" />
/// <reference path="../../../ops/dal/site-archeo-set.ts" />

module snm.ops.components {
    class SiteArcheoListController {
        static $inject: string[] = ["$scope", "$log", "dbContext"];

        public sites: snm.ops.ISiteArcheo[];

        constructor(private $scope: ng.IScope,
                    private $log: ng.ILogService,
                    private dbContext: snm.services.dal.DbContext) {
            let repoCommune: snm.ops.ICommuneSet =
                <snm.ops.ICommuneSet> dbContext.getRepository("Commune");
            let repoDepartement: snm.ops.IDepartementSet =
                <snm.ops.IDepartementSet> dbContext.getRepository("Departement");
            let repoSiteArcheo: snm.ops.ISiteArcheoSet =
                <snm.ops.ISiteArcheoSet> dbContext.getRepository("SiteArcheo");
            let repoPhaseChrono: snm.chrono.IPhaseChronologiqueSet =
                <snm.chrono.IPhaseChronologiqueSet> dbContext.getRepository("PhaseChronologique");
            Promise.all([
                repoCommune.refresh(),
                repoDepartement.refresh(),
                repoSiteArcheo.refresh(),
                repoPhaseChrono.refresh()
            ]).then(() => {
                this.sites = repoSiteArcheo.getAll();
                this.$scope.$applyAsync();
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