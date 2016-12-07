/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="./definitions.ts" />
/// <reference path="./db-context.ts" />
/// <reference path="./entity-set.ts" />

module snm.services.dal {
    export abstract class EntityBase<TKey> implements IEntity<TKey> {
        protected _dbContext: DbContext;

        constructor(dbContext: DbContext) {
            if (!dbContext) {
                throw new Error("DbContext cannot be null.");
            }

            this._dbContext = dbContext;
        }

        public abstract getKey(): TKey;
    }
}