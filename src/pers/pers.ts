/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="../services/dal/db-context.ts" />
/// <reference path="./dal/personne-set.ts" />
/// <reference path="./dal/organisme-set.ts" />

module snm.pers {
    angular.module(adunware.snm.AppConstants.PERS_MODULE_NAME, [
        "adunware.snm.services.dal.dbContext"
    ]).run(["dbContext", (dbContext: snm.services.dal.DbContext) => {
        dbContext.addRepository("Personne", (dbContext: snm.services.dal.DbContext, $http: ng.IHttpService) =>
            new snm.pers.dal.PersonneSet(dbContext, $http));
        dbContext.addRepository("Organisme", (dbContext: snm.services.dal.DbContext, $http: ng.IHttpService) =>
            new snm.pers.dal.OrganismeSet(dbContext, $http));
    }]);
}