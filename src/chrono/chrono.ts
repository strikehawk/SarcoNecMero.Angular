/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="../services/dal/db-context.ts" />
/// <reference path="./dal/phase-chronologique-set.ts" />
/// <reference path="./components/phases-chronologiques/phases-chronologiques.component.ts" />

module snm.chrono {
    import DbContext = snm.services.dal.DbContext;

    angular.module(snm.AppConstants.CHRONO_MODULE_NAME, [
        "snm.services.dal.dbContext",
        "snm.chrono.components.phases-chronologiques"
    ]).run(["dbContext", (dbContext: DbContext) => {
        DbContext.addRepository("PhaseChronologique", (dbContext: DbContext, $http: ng.IHttpService) =>
            new snm.chrono.dal.PhaseChronologiqueSet(dbContext, $http));
    }]);
}