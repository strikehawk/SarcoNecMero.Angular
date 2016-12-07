/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="../services/dal/db-context.ts" />
/// <reference path="./dal/personne-set.ts" />
/// <reference path="./dal/organisme-set.ts" />

module snm.pers {
    import DbContext = snm.services.dal.DbContext;

    angular.module(adunware.snm.AppConstants.PERS_MODULE_NAME, [
        "adunware.snm.services.dal.dbContext"
    ]).run(["dbContext", (dbContext: DbContext) => {
        DbContext.addRepository("Personne", (dbContext: DbContext, $http: ng.IHttpService) =>
            new snm.pers.dal.PersonneSet(dbContext, $http));
        DbContext.addRepository("Organisme", (dbContext: DbContext, $http: ng.IHttpService) =>
            new snm.pers.dal.OrganismeSet(dbContext, $http));
    }]);
}