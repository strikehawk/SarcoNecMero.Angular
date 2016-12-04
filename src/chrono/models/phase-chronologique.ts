/// <reference path="../../pers/definitions.ts" />
/// <reference path="../../services/dal/entity-base.ts" />
/// <reference path="../../services/dal/db-context.ts" />

module snm.chrono {
    export class PhaseChronologique extends snm.services.dal.EntityBase<number> implements IPhaseChronologique {

        //region properties
        private _id: number;

        public get id(): number {
            return this._id;
        }

        public set id(value: number) {
            this._id = value;
        }

        private _code: string;

        public get code(): string {
            return this._code;
        }

        public set code(value: string) {
            this._code = value;
        }

        private _nom: string;

        public get nom(): string {
            return this._nom;
        }

        public set nom(value: string) {
            this._nom = value;
        }

        private _debut: number;

        public get debut(): number {
            return this._debut;
        }

        public set debut(value: number) {
            this._debut = value;
        }

        private _fin: number;

        public get fin(): number {
            return this._fin;
        }

        public set fin(value: number) {
            this._fin = value;
        }

        //endregion

        constructor(dbContext: snm.services.dal.DbContext, data?: PhaseChronologiqueData) {
            super(dbContext);

            if (data) {
                this._id = data.id;
                this._code = data.code;
                this._nom = data.nom;
                this._debut = data.debut;
                this._fin = data.fin;
            }
        }

        public getKey(): number {
            return this._id;
        }
    }
}