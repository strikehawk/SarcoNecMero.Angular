/// <reference path="../../../typings/angular/angular.d.ts" />

module snm.ops {
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
	export interface ISiteArcheoService {
		getAll(): ISiteArcheo[];
		getById(id: number): ISiteArcheo;
		refresh(): Promise<Object>;
	}
}