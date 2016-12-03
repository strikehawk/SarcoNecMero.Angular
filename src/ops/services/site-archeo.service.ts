/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../../typings/angular/angular-resource.d.ts" />
/// <reference path="../models/sarconecmero-ops.ts" />

module adunware.snm.ops.services {
	export class SiteArcheoService implements ISiteArcheoService {
		static $inject: string[] = ["$http"];

		private _isRunning: boolean = false;

		public get isRunning(): boolean {
			return this._isRunning;
		}

		private _map: Map<number, ISiteArcheo> = new Map<number, ISiteArcheo>();
		private _promise: Promise<Object>;

		constructor(private $http: ng.IHttpService) {
			this.refresh();
		}

		public getAll(): ISiteArcheo[] {
			let result: ISiteArcheo[] = [];
			this._map.forEach((site: ISiteArcheo) => { result.push(site); });

			return result;
		}

		public getById(id: number): ISiteArcheo {
			return this._map.get(id);
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
			})

			this.$http.get<ISiteArcheo[]>("api/ops/sites/summary")
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

		private _parseArray(array: ISiteArcheo[]): void {
			array.map((site: ISiteArcheo) => {
				this._map.set(site.id, site);
			});
		}
	}

	angular.module("adunware.snm.ops.services.siteArcheoService", [])
		.service("siteArcheoService", ["$http", SiteArcheoService]);
}