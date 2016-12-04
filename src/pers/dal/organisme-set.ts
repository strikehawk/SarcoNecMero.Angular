/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../models/organisme.ts" />
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-set.ts" />

module snm.pers.dal {
    export class OrganismeSet extends snm.services.dal.EntitySet<number, snm.pers.IOrganisme> implements IOrganismeSet {
        constructor(dbContext: snm.services.dal.DbContext, $http: ng.IHttpService) {
            super(dbContext, {
                $http: $http,
                parseEntity: (dbContext: snm.services.dal.DbContext, data: snm.pers.OrganismeData) => {
                    return new Organisme(dbContext, data);
                },
                getAllUrl: "api/pers/organisme"
            });
            this.refresh();
        }
    }
}
