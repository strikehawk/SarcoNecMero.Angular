/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../models/commune.ts" />
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-set.ts" />

module snm.ops.dal {
    export class CommuneSet extends snm.services.dal.EntitySet<number, snm.ops.ICommune>
        implements ICommuneSet {
        constructor(dbContext: snm.services.dal.DbContext, $http: ng.IHttpService) {
            super(dbContext, {
                $http: $http,
                parseEntity: (dbContext: snm.services.dal.DbContext, data: snm.ops.Commune) => {
                    return new Commune(dbContext, data);
                },
                getAllUrl: "api/ops/common/commune"
            });
            this.refresh();
        }
    }
}