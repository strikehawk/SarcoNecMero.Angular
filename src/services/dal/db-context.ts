/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="./definitions.ts" />
/// <reference path="./entity-set.ts" />

module snm.services.dal {
    export type EntitySetFactory = (dbContext: DbContext, $http: ng.IHttpService) => IEntitySet<any, any>;

    export class DbContext {
        static $inject: string[] = ["$http"];

        private static _factories: Map<string, EntitySetFactory> = new Map<string, EntitySetFactory>();
        private _repositories: Map<string, IEntitySet<any, any>> = new Map<string, IEntitySet<any, any>>();

        constructor(private $http: ng.IHttpService) {
        }

        public getRepository<TKey, TEntity extends IEntity<TKey>>(type: string): IEntitySet<TKey, TEntity> {
            if (!type) {
                throw new Error("Type cannot be null.");
            }

            if (!DbContext._factories.has(type)) {
                throw new Error("Unknown factory '" + type + "'");
            }

            if (this._repositories.has(type)) {
                //Repository has already been instantiated. Return it.
                return this._repositories.get(type);
            } else {
                //No existing repository. Create a new one.
                let factory: EntitySetFactory = DbContext._factories.get(type);
                let result: IEntitySet<TKey, TEntity> = factory(this, this.$http);

                //Add new instance to repositories map
                this._repositories.set(type, result);

                return <IEntitySet<TKey, TEntity>> result;
            }
        }

        public static addRepository(type: string, factory: EntitySetFactory): void {
            if (!type) {
                throw new Error("Type cannot be empty.");
            }

            if (!factory) {
                throw new Error("Factory cannot be null.");
            }

            DbContext._factories.set(type, factory);
        }
    }

    angular.module("snm.services.dal.dbContext", [])
        .factory("dbContext", ["$http", ($http: ng.IHttpService) => new DbContext($http)]);
}
