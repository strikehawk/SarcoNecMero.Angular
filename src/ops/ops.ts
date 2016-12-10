/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />

/// <reference path="./components/site-archeo-list/site-archeo-list.component.ts" />
/// <reference path="../services/dal/db-context.ts" />
/// <reference path="./dal/departement-set.ts" />
/// <reference path="./dal/commune-set.ts" />
/// <reference path="./dal/site-archeo-set.ts" />
/// <reference path="./dal/operation-archeo-set.ts" />

module snm.ops {
    import DbContext = snm.services.dal.DbContext;

    angular.module(adunware.snm.AppConstants.OPS_MODULE_NAME, [
        "snm.services.dal.dbContext",
        "snm.ops.components.siteArcheoList",
    ]).run(["dbContext", (dbContext: DbContext) => {
        DbContext.addRepository("Departement", (dbContext: DbContext, $http: ng.IHttpService) =>
            new snm.ops.dal.DepartementSet(dbContext, $http));
        DbContext.addRepository("Commune", (dbContext: DbContext, $http: ng.IHttpService) =>
            new snm.ops.dal.CommuneSet(dbContext, $http));
        DbContext.addRepository("SiteArcheo", (dbContext: DbContext, $http: ng.IHttpService) =>
            new snm.ops.dal.SiteArcheoSet(dbContext, $http));
        DbContext.addRepository("OperationArcheo", (dbContext: DbContext, $http: ng.IHttpService) =>
            new snm.ops.dal.OperationArcheoSet(dbContext, $http));
    }]);
}