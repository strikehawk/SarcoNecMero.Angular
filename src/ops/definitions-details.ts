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
        identifications: snm.ops.IdentificationOperation[];
    }

    export interface SiteArcheoData {
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
        identifications: snm.ops.IdentificationSite[]
    }

    export class SiteArcheo implements SiteArcheoData {
        public id: number;
        public reference: string;
        public codeCommune: number;
        public commune: string;
        public departement: number;
        public x: number;
        public y: number;
        public localisation: string;
        public debutOccupationId: number;
        public finOccupationId: number;
        public operations: OperationArcheo[];
        public identifications: snm.ops.IdentificationSite[];

        public clone(): SiteArcheo {
            let site: SiteArcheo = new SiteArcheo();
            site.updateFrom(this);

            return site;
        }

        public updateFrom(other: SiteArcheoData): void {
            if (!other) {
                return;
            }
            
            this.id = other.id;
            this.reference = other.reference;
            this.codeCommune = other.codeCommune;
            this.commune = other.commune;
            this.departement = other.departement;
            this.x = other.x;
            this.y = other.y;
            this.localisation = other.localisation;
            this.debutOccupationId = other.debutOccupationId;
            this.finOccupationId = other.finOccupationId;
            this.operations = _.cloneDeep(other.operations);
            this.identifications = _.cloneDeep(other.identifications);            
        }

        public isEquivalent(other: SiteArcheo): boolean {
            if (!other) {
                return false;
            }

            let result: boolean = true;

            result = result && this.id === other.id;
            result = result && this.reference === other.reference;
            result = result && this.codeCommune === other.codeCommune;
            result = result && this.commune === other.commune;
            result = result && this.departement === other.departement;
            result = result && this.x === other.x;
            result = result && this.y === other.y;
            result = result && this.localisation === other.localisation;
            result = result && this.debutOccupationId === other.debutOccupationId;
            result = result && this.finOccupationId === other.finOccupationId;
            result = result && _.isEqual(this.operations, other.operations);
            result = result && _.isEqual(this.identifications, other.identifications);

            return result;
        }
    }

    export interface Commune {
        code: number;
        nom: string;
        departement: number;
    }
}
