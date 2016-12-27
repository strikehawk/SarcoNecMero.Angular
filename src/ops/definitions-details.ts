/// <reference path="./definitions.ts" />

module snm.ops.details {
    export interface OperationArcheo {
        id: number;
        codeCommune: number;
        commune: string;
        departement: number;
        x: number;
        y: number;
        localisation: string;
        responsableId: number;
        organismeId: number;
        debutTravaux: string;
        finTravaux: string;
        debutOccupationId: number;
        finOccupationId: number;
        planId: number;
        identifications: snm.ops.IdentificationSite[];
    }

    export interface SiteArcheo {
        id: number;
        reference: string;
        codeCommune: number;
        commune: string;
        departement: number;
        x: number;
        y: number;
        localisation: string;
        debutOccupationId: number;
        finOccupationId: number;
        operations: OperationArcheo[];
        identifications: snm.ops.IdentificationSite[];
    }

    export interface Commune {
        code: number;
        nom: string;
        departement: number;
    }
}
