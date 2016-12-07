/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../models/departement.ts" />
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-set.ts" />

module snm.ops.dal {
    export class DepartementSet extends snm.services.dal.EntitySet<number, snm.ops.IDepartement>
        implements IDepartementSet {
        constructor(dbContext: snm.services.dal.DbContext, $http: ng.IHttpService) {
            super(dbContext, {
                $http: $http,
                parseEntity: (dbContext: snm.services.dal.DbContext, data: snm.ops.DepartementData) => {
                    return new Departement(dbContext, data);
                },
                getAllUrl: "api/ops/common/departement"
            });
            this.refresh();
        }
    }
}