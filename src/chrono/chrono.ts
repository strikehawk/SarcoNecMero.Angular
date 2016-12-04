/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="../services/dal/db-context.ts" />
/// <reference path="./dal/phase-chronologique-set.ts" />

module snm.chrono {
    angular.module(adunware.snm.AppConstants.CHRONO_MODULE_NAME, [
        "adunware.snm.services.dal.dbContext"
    ]).run(["dbContext", (dbContext: snm.services.dal.DbContext) => {
        dbContext.addRepository("Personne", (dbContext: snm.services.dal.DbContext, $http: ng.IHttpService) =>
            new snm.chrono.dal.PhaseChronologiqueSet(dbContext, $http));
    }]);
}