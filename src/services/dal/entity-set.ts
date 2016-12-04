/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="./definitions.ts" />

module snm.services.dal {
    export class EntitySet<TKey, TEntity extends IEntity<TKey>> implements IEntitySet<TKey, TEntity> {
        protected _dbContext: snm.services.dal.DbContext;
        protected $http: ng.IHttpService;
        private _parsingFunc: (dbContext: DbContext, data: any) => TEntity;
        protected _getAllUrl: string;

        protected _isRunning: boolean = false;

        public get isRunning(): boolean {
            return this._isRunning;
        }

        protected _map: Map<TKey, TEntity> = new Map<TKey, TEntity>();
        private _promise: Promise<Object>;

        constructor(dbContext: snm.services.dal.DbContext, options: EntitySetOptions<TEntity, any>) {
            if (!dbContext) {
                throw new Error("DbContext cannot be null.");
            }

            this._dbContext = dbContext;

            this._validateOptions(options);

            this.$http = options.$http;
            this._parsingFunc = options.parseEntity;
            this._getAllUrl = options.getAllUrl;

            this.refresh();
        }

        public getAll(): TEntity[] {
            let result: TEntity[] = [];
            this._map.forEach((o: TEntity) => { result.push(o); });

            return result;
        }

        public getByKey(key: TKey): TEntity {
            return this._map.get(key);
        }

        public refresh(): Promise<Object> {
            if (this._promise) {
                //If a Promise is already in flight, return it
                return this._promise;
            }

            this._isRunning = true;

            let resolveFunc: (value?: Object|PromiseLike<Object>) => void;
            let rejectFunc: (reason?: any) => void;

            this._promise = new Promise<Object>((resolve, reject) => {
                resolveFunc = resolve;
                rejectFunc = reject;
            });

            this.$http.get<any[]>(this._getAllUrl)
                .then((response) => {
                    this._parseArray(response.data);
                    resolveFunc();
                }, (reason?: any) => rejectFunc(reason))
                .finally(() => {
                    this._isRunning = false;
                    this._promise = null;
                });

            return this._promise;
        }

        protected _parseArray(array: any[]): void {
            array.map((o: TEntity) => {
                let entity: TEntity = this._parsingFunc(this._dbContext, o);
                this._map.set(entity.getKey(), entity);
            });
        }

        protected _validateOptions(options: EntitySetOptions<TEntity, any>): void {
            if (!options) {
                throw new Error("Options cannot be null.");
            }

            if (!options.$http) {
                throw new Error("$http cannot be null.");
            }

            if (!options.parseEntity) {
                throw new Error("ParseEntity cannot be null.");
            }

            if (!options.getAllUrl) {
                throw new Error("GetAll URL cannot be empty.");
            }
        }
    }
}
