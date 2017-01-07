/// <reference path="../definitions.ts" />
/// <reference path="../../chrono/definitions.ts" />
/// <reference path="../../pers/definitions.ts" />
/// <reference path="../../services/dal/entity-base.ts" />
/// <reference path="../../services/dal/db-context.ts" />

module snm.ops {
    import IPhaseChronologique = snm.chrono.IPhaseChronologique;
    import IPersonne = snm.pers.IPersonne;
    import IOrganisme = snm.pers.IOrganisme;

    export class OperationArcheo extends snm.services.dal.EntityBase<number> implements IOperationArcheo {

        //region properties
        private _id: number;

        public get id(): number {
            return this._id;
        }

        public set id(value: number) {
            this._id = value;
        }

        private _siteId: number;

        public get siteId(): number {
            return this._siteId;
        }

        public set siteId(value: number) {
            this._siteId = value;
        }

        public get site(): ISiteArcheo {
            return <ISiteArcheo> this._dbContext.getRepository("SiteArcheo").getByKey(this._siteId);
        }

        private _codeCommune: number;

        public get codeCommune(): number {
            return this._codeCommune;
        }

        public set codeCommune(value: number) {
            this._codeCommune = value;
        }

        public get commune(): ICommune {
            return <ICommune> this._dbContext.getRepository("Commune").getByKey(this._codeCommune);
        }

        private _x: number;

        public get x(): number {
            return this._x;
        }

        public set x(value: number) {
            this._x = value;
        }

        private _y: number;

        public get y(): number {
            return this._y;
        }

        public set y(value: number) {
            this._y = value;
        }

        private _localisation: string;

        public get localisation(): string {
            return this._localisation;
        }

        public set localisation(value: string) {
            this._localisation = value;
        }

        private _responsableId: number;

        public get responsableId(): number {
            return this._responsableId;
        }

        public set responsableId(value: number) {
            this._responsableId = value;
        }

        public get responsable(): IPersonne {
            return <IPersonne> this._dbContext.getRepository("Personne").getByKey(this._responsableId);
        }

        private _organismeId: number;

        public get organismeId(): number {
            return this._organismeId;
        }

        public set organismeId(value: number) {
            this._organismeId = value;
        }

        public get organisme(): IOrganisme {
            return <IOrganisme> this._dbContext.getRepository("Organisme").getByKey(this._organismeId);
        }

        private _debutTravaux: string;

        public get debutTravaux(): string {
            return this._debutTravaux;
        }

        public set debutTravaux(value: string) {
            this._debutTravaux = value;
        }

        private _finTravaux: string;

        public get finTravaux(): string {
            return this._finTravaux;
        }

        public set finTravaux(value: string) {
            this._finTravaux = value;
        }

        private _debutOccupationId: number;

        public get debutOccupationId(): number {
            return this._debutOccupationId;
        }

        public set debutOccupationId(value: number) {
            this._debutOccupationId = value;
        }

        public get debutOccupation(): snm.chrono.IPhaseChronologique {
            return <snm.chrono.IPhaseChronologique> this._dbContext.getRepository("PhaseChronologique")
                .getByKey(this._debutOccupationId);
        }

        private _finOccupationId: number;

        public get finOccupationId(): number {
            return this._finOccupationId;
        }

        public set finOccupationId(value: number) {
            this._finOccupationId = value;
        }

        public get finOccupation(): snm.chrono.IPhaseChronologique {
            return <snm.chrono.IPhaseChronologique> this._dbContext.getRepository("PhaseChronologique")
                .getByKey(this._finOccupationId);
        }

        private _planId: number;

        public get planId(): number {
            return this._planId;
        }

        public set planId(value: number) {
            this._planId = value;
        }

        private _identifications: IdentificationOperation[];

        public get identifications(): IdentificationOperation[] {
            return this._identifications;
        }

        //endregion

        constructor(dbContext: snm.services.dal.DbContext, data?: OperationArcheoData) {
            super(dbContext);

            if (data) {
                this._id = data.id;
                this._siteId = data.siteId;
                this._codeCommune = data.codeCommune;
                this._x = data.x;
                this._y = data.y;
                this._localisation = data.localisation;
                this._responsableId = data.responsableId;
                this._organismeId = data.organismeId;
                this._debutTravaux = data.debutTravaux;
                this._finTravaux = data.finTravaux;
                this._debutOccupationId = data.debutOccupationId;
                this._finOccupationId = data.finOccupationId;
                this._planId = data.planId;
                this._identifications = data.identifications;
            }
        }

        public getKey(): number {
            return this._id;
        }
    }
}