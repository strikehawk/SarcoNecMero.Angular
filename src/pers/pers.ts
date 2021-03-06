/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="../services/dal/db-context.ts" />
/// <reference path="./dal/personne-set.ts" />
/// <reference path="./dal/organisme-set.ts" />
/// <reference path="./components/personne/personne.component.ts" />

module snm.pers {
    import DbContext = snm.services.dal.DbContext;

    angular.module(snm.AppConstants.PERS_MODULE_NAME, [
        "snm.services.dal.dbContext",
        "snm.pers.components.personne"
    ]).run(["dbContext", (dbContext: DbContext) => {
        DbContext.addRepository("Personne", (dbContext: DbContext, $http: ng.IHttpService) =>
            new snm.pers.dal.PersonneSet(dbContext, $http));
        DbContext.addRepository("Organisme", (dbContext: DbContext, $http: ng.IHttpService) =>
            new snm.pers.dal.OrganismeSet(dbContext, $http));
    }]);
}