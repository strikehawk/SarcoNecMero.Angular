/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="../services/dal/db-context.ts" />
/// <reference path="./dal/phase-chronologique-set.ts" />

module snm.chrono {
    import DbContext = snm.services.dal.DbContext;

    angular.module(adunware.snm.AppConstants.CHRONO_MODULE_NAME, [
        "adunware.snm.services.dal.dbContext"
    ]).run(["dbContext", (dbContext: DbContext) => {
        DbContext.addRepository("PhaseChronologique", (dbContext: DbContext, $http: ng.IHttpService) =>
            new snm.chrono.dal.PhaseChronologiqueSet(dbContext, $http));
    }]);
}