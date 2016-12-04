/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-base.ts" />
/// <reference path="../../services/dal/db-context.ts" />

module snm.pers {
    export class Organisme extends snm.services.dal.EntityBase<number> implements IOrganisme {

        //region properties
        private _id: number;

        public get id(): number {
            return this._id;
        }

        public set id(value: number) {
            this._id = value;
        }

        private _nom: string;

        public get nom(): string {
            return this._nom;
        }

        public set nom(value: string) {
            this._nom = value;
        }

        private _abreviation: string;

        public get abreviation(): string {
            return this._abreviation;
        }

        public set abreviation(value: string) {
            this._abreviation = value;
        }

        //endregion

        constructor(dbContext: snm.services.dal.DbContext, data?: OrganismeData) {
            super(dbContext);

            if (data) {
                this._id = data.id;
                this._nom = data.nom;
                this._abreviation = data.abreviation;
            }
        }

        public getKey(): number {
            return this._id;
        }
    }
}