/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../models/commune.ts" />
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-set.ts" />

module snm.ops.dal {
    export class SiteArcheoSet extends snm.services.dal.EntitySet<number, snm.ops.ISiteArcheo>
        implements ISiteArcheoSet {
        constructor(dbContext: snm.services.dal.DbContext, $http: ng.IHttpService) {
            super(dbContext, {
                $http: $http,
                parseEntity: (dbContext: snm.services.dal.DbContext, data: snm.ops.SiteArcheo) => {
                    return new SiteArcheo(dbContext, data);
                },
                getAllUrl: "api/ops/sites/summary"
            });
            this.refresh();
        }
    }
}