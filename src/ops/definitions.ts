/// <reference path="../services/dal/definitions.ts" />
/// <reference path="../chrono/definitions.ts" />

declare module snm.ops {
    export interface DepartementData {
        numero: number;
        nom: string;
    }

    export interface CommuneData {
        code: number;
        nom: string;
        x: number;
        y: number;
        departementId: number;
        codeRegion: number;
    }

    export interface SiteArcheoData {
        id: number;
        codeCommune: number;
        x: number;
        y: number;
        localisation: string;
        debutOccupationId: number;
        finOccupationId: number;
        planId: number;
    }

    export interface IDepartement extends DepartementData, snm.services.dal.IEntity<number> {
    }

    export interface ICommune extends CommuneData, snm.services.dal.IEntity<number> {
        departement: IDepartement;
    }

    export interface ISiteArcheo extends SiteArcheoData, snm.services.dal.IEntity<number> {
        commune: ICommune;
        debutOccupation: snm.chrono.IPhaseChronologique;
        finOccupation: snm.chrono.IPhaseChronologique;
    }

    export interface IDepartementSet extends snm.services.dal.EntitySet<number, IDepartement> {
    }

    export interface ICommuneSet extends snm.services.dal.EntitySet<number, ICommune> {
    }

    export interface ISiteArcheoSet extends snm.services.dal.EntitySet<number, ISiteArcheo> {
    }
}