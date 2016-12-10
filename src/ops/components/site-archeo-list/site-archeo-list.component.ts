/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../../services/dal/db-context.ts" />
/// <reference path="../../../ops/dal/commune-set.ts" />
/// <reference path="../../../ops/dal/departement-set.ts" />
/// <reference path="../../../ops/dal/site-archeo-set.ts" />
/// <reference path="../../../ops/dal/operation-archeo-set.ts" />
/// <reference path="../../../chrono/dal/phase-chronologique-set.ts" />

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
            let repoOperationArcheo: snm.ops.IOperationArcheoSet =
                <snm.ops.IOperationArcheoSet> dbContext.getRepository("OperationArcheo");
            let repoPhaseChrono: snm.chrono.IPhaseChronologiqueSet =
                <snm.chrono.IPhaseChronologiqueSet> dbContext.getRepository("PhaseChronologique");
            Promise.all([
                repoCommune.refresh(),
                repoDepartement.refresh(),
                repoSiteArcheo.refresh(),
                repoOperationArcheo.refresh(),
                repoPhaseChrono.refresh()
            ]).then(() => {
                this.sites = repoSiteArcheo.getAll();
                this.$scope.$applyAsync();
            });
        }
    }

    // component
    angular.module("snm.ops.components.siteArcheoList", [
        "snm.services.dal.dbContext",
        "snm.chrono.components.phases-chronologiques",
        "snm.pers.components.personne"
    ]).component("siteArcheoList", {
        templateUrl: '/app/ops/components/site-archeo-list/site-archeo-list.component.html',
        controller: SiteArcheoListController,
        controllerAs: "vm"
    });
}