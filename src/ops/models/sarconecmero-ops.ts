/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../../typings/angular/angular-resource.d.ts" />

module adunware.snm.ops {
	export interface ISiteArcheo {
		id: number;
		codeCommune: number;
		x: number;
		y: number;
		localisation: string;
		debutOccupationId: number;
		finOccupationId: number;
		planId: number;
	}

	//Services
	export interface ISiteArcheoServiceDef extends ng.resource.IResource<ISiteArcheo> {
	}

	export interface ISiteArcheoResourceService extends ng.resource.IResourceClass<ISiteArcheo> {
		getById(id: number): ISiteArcheo;
	}

	export interface ISiteArcheoService {
		getAll(): ISiteArcheo[];
		getById(id: number): ISiteArcheo;
		refresh(): Promise<Object>;
	}
}