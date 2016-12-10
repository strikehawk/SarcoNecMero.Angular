/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../models/commune.ts" />
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-set.ts" />

module snm.ops.dal {
    export class OperationArcheoSet extends snm.services.dal.EntitySet<number, snm.ops.IOperationArcheo>
        implements IOperationArcheoSet {
        constructor(dbContext: snm.services.dal.DbContext, $http: ng.IHttpService) {
            super(dbContext, {
                $http: $http,
                parseEntity: (dbContext: snm.services.dal.DbContext, data: snm.ops.OperationArcheo) => {
                    return new OperationArcheo(dbContext, data);
                },
                getAllUrl: "api/ops/operations"
            });
            this.refresh();
        }

        public getBySiteId(siteId: number): IOperationArcheo[] {
            if (typeof siteId !== "number") {
                throw new Error("SiteId must be a number.");
            }

            let result: IOperationArcheo[] = [];
            this._map.forEach((op: IOperationArcheo) => {
                if (op.siteId === siteId) {
                    result.push(op);
                }
            });

            return result;
        }
    }
}