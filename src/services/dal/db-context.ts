/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="./definitions.ts" />
/// <reference path="./entity-set.ts" />

module snm.services.dal {
    export type EntitySetFactory = (dbContext: DbContext, $http: ng.IHttpService) => IEntitySet<any, any>;

    export class DbContext {
        static $inject: string[] = ["$http"];

        private _map: Map<string, EntitySetFactory> = new Map<string, EntitySetFactory>();

        constructor(private $http: ng.IHttpService) {
            let t = typeof DbContext;
        }

        public getRepository<TKey, TEntity extends IEntity<TKey>>(type: string): IEntitySet<TKey, TEntity> {
            let result: IEntitySet<TKey, TEntity> = this._map.get(type)(this, this.$http);

            return <IEntitySet<TKey, TEntity>> result;
        }

        public addRepository(type: string, factory: EntitySetFactory): void {
            if (!type) {
                throw new Error("Type cannot be empty.");
            }

            if (!factory) {
                throw new Error("Factory cannot be null.");
            }

            this._map.set(type, factory);
        }
    }

    angular.module("adunware.snm.services.dal.dbContext", [])
        .service("dbContext", ["$http", DbContext]);
}
