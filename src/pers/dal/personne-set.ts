/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../models/personne.ts" />
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-set.ts" />

module snm.pers.dal {
    export class PersonneSet extends snm.services.dal.EntitySet<number, snm.pers.IPersonne>
        implements IPersonneSet {
        constructor(dbContext: snm.services.dal.DbContext, $http: ng.IHttpService) {
            super(dbContext, {
                $http: $http,
                parseEntity: (dbContext: snm.services.dal.DbContext, data: snm.pers.PersonneData) => {
                    return new Personne(dbContext, data);
                },
                getAllUrl: "api/pers/personne"
            });
            this.refresh();
        }
    }
}