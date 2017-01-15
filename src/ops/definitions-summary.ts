/// <reference path="./definitions.ts" />
/// <reference path="../pers/definitions-summary.ts" />

module snm.ops {
    export interface OperationArcheoSummary {
        id: number;
        siteId: number;
        codeCommune: number;
        commune: string;
        departement: number;
        x: number;
        y: number;
        localisation: string;
        responsable: snm.pers.PersonneSummary;
        organisme: string;
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
