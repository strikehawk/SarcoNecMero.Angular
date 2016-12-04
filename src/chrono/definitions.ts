/// <reference path="../services/dal/definitions.ts" />

declare module snm.chrono {
    export interface PhaseChronologiqueData {
        id: number;
        code: string;
        nom: string;
        debut: number;
        fin: number;
    }

    export interface IPhaseChronologique extends PhaseChronologiqueData, snm.services.dal.IEntity<number> {
    }

    export interface IPhaseChronologiqueSet extends snm.services.dal.EntitySet<number, IPhaseChronologique> {
    }
}