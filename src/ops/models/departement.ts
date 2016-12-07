/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-base.ts" />
/// <reference path="../../services/dal/db-context.ts" />

module snm.ops {
    export class Departement extends snm.services.dal.EntityBase<number> implements IDepartement {

        //region properties
        private _numero: number;

        public get numero(): number {
            return this._numero;
        }

        public set numero(value: number) {
            this._numero = value;
        }

        private _nom: string;

        public get nom(): string {
            return this._nom;
        }

        public set nom(value: string) {
            this._nom = value;
        }

        //endregion

        constructor(dbContext: snm.services.dal.DbContext, data?: DepartementData) {
            super(dbContext);

            if (data) {
                this._numero = data.numero;
                this._nom = data.nom;
            }
        }

        public getKey(): number {
            return this._numero;
        }
    }
}