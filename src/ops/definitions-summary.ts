/// <reference path="./definitions.ts" />

module snm.ops {
    export interface OperationArcheoSummary {
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
        identifications: snm.ops.IdentificationOperation[];
    }

    export interface SiteArcheoSummary {
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
        operations: OperationArcheoSummary[];
        identifications: snm.ops.IdentificationSite[];
    }

    export interface CommuneSummary {
        code: number;
        nom: string;
        departement: number;
        sites: SiteArcheoSummary[];
    }
}
