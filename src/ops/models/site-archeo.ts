/// <reference path="../definitions.ts" />
/// <reference path="../../chrono/definitions.ts" />
/// <reference path="../../services/dal/entity-base.ts" />
/// <reference path="../../services/dal/db-context.ts" />

module snm.ops {
    import IPhaseChronologique = snm.chrono.IPhaseChronologique;
    export class SiteArcheo extends snm.services.dal.EntityBase<number> implements ISiteArcheo {

        //region properties
        private _id: number;

        public get id(): number {
            return this._id;
        }

        public set id(value: number) {
            this._id = value;
        }

        private _codeCommune: number;

        public get codeCommune(): number {
            return this._codeCommune;
        }

        public set codeCommune(value: number) {
            this._codeCommune = value;
        }

        public get commune(): ICommune {
            //TODO getRepository() instantiate a new Repo at each call, and a request is made in every constructor
            //Use the UnitOfWork pattern
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

        //endregion

        constructor(dbContext: snm.services.dal.DbContext, data?: SiteArcheoData) {
            super(dbContext);

            if (data) {
                this._id = data.id;
                this._codeCommune = data.codeCommune;
                this._x = data.x;
                this._y = data.y;
                this._localisation = data.localisation;
                this._debutOccupationId = data.debutOccupationId;
                this._finOccupationId = data.finOccupationId;
                this._planId = data.planId;
            }
        }

        public getKey(): number {
            return this._id;
        }
    }
}