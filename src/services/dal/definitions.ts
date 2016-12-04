/// <reference path="../../../typings/angular/angular.d.ts" />

module snm.services.dal {
    export interface EntitySetOptions<TEntity, TData> {
        $http: ng.IHttpService;
        getAllUrl: string;
        parseEntity(dbContext: DbContext, data: TData): TEntity;
    }

    export interface IEntity<TKey> {
        getKey(): TKey;
    }

    export interface IEntitySet<TKey, TEntity extends IEntity<TKey>> {
        getAll(): TEntity[];
        getByKey(key: TKey): TEntity;
        refresh(): Promise<Object>;
    }
}
