/// <reference path="../services/dal/definitions.ts" />

declare module snm.pers {
    export interface PersonneData {
        id: number;
        prenom: string;
        autresPrenoms: string;
        nom: string;
        suffixe: string;
        nomComplet: string;
        organismeId: number;
    }

    export interface OrganismeData {
        id: number;
        nom: string;
        abreviation: string;
    }

    export interface IPersonne extends PersonneData, snm.services.dal.IEntity<number> {
        organisme: IOrganisme
    }

    export interface IOrganisme extends OrganismeData, snm.services.dal.IEntity<number> {
    }

    export interface IPersonneSet extends snm.services.dal.EntitySet<number, IPersonne> {
    }
    export interface IOrganismeSet extends snm.services.dal.EntitySet<number, IOrganisme> {
    }
}