/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-base.ts" />
/// <reference path="../../services/dal/db-context.ts" />

module snm.ops {
    export class Commune extends snm.services.dal.EntityBase<number> implements ICommune {

        //region properties
        private _code: number;

        public get code(): number {
            return this._code;
        }

        public set code(value: number) {
            this._code = value;
        }

        private _nom: string;

        public get nom(): string {
            return this._nom;
        }

        public set nom(value: string) {
            this._nom = value;
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

        private _departementId: number;

        public get departementId(): number {
            return this._departementId;
        }

        public set departementId(value: number) {
            this._departementId = value;
        }

        public get departement(): IDepartement {
            return <IDepartement> this._dbContext.getRepository("Departement").getByKey(this._departementId);
        }

        private _codeRegion: number;

        public get codeRegion(): number {
            return this._codeRegion;
        }

        public set codeRegion(value: number) {
            this._codeRegion = value;
        }

        //endregion

        constructor(dbContext: snm.services.dal.DbContext, data?: CommuneData) {
            super(dbContext);

            if (data) {
                this._code = data.code;
                this._nom = data.nom;
                this._x = data.x;
                this._y = data.y;
                this._departementId = data.departementId;
                this._codeRegion = data.codeRegion;
            }
        }

        public getKey(): number {
            return this._code;
        }
    }
}