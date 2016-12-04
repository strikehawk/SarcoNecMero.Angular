/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../models/phase-chronologique.ts" />
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-set.ts" />

module snm.chrono.dal {
    import IPhaseChronologiqueSet = snm.chrono.IPhaseChronologiqueSet;
    export class PhaseChronologiqueSet extends snm.services.dal.EntitySet<number, snm.chrono.IPhaseChronologique>
        implements IPhaseChronologiqueSet {
        constructor(dbContext: snm.services.dal.DbContext, $http: ng.IHttpService) {
            super(dbContext, {
                $http: $http,
                parseEntity: (dbContext: snm.services.dal.DbContext, data: snm.chrono.PhaseChronologiqueData) => {
                    return new PhaseChronologique(dbContext, data);
                },
                getAllUrl: "api/chrono/phase"
            });
            this.refresh();
        }
    }
}
