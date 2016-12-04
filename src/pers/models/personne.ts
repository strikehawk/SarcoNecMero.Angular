/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-base.ts" />
/// <reference path="../../services/dal/db-context.ts" />

module snm.pers {
    export class Personne extends snm.services.dal.EntityBase<number> implements IPersonne {

        //region properties
        private _id: number;

        public get id(): number {
            return this._id;
        }

        public set id(value: number) {
            this._id = value;
        }

        private _prenom: string;

        public get prenom(): string {
            return this._prenom;
        }

        public set prenom(value: string) {
            this._prenom = value;
        }

        private _autresPrenoms: string;

        public get autresPrenoms(): string {
            return this._autresPrenoms;
        }

        public set autresPrenoms(value: string) {
            this._autresPrenoms = value;
        }

        private _nom: string;

        public get nom(): string {
            return this._nom;
        }

        public set nom(value: string) {
            this._nom = value;
        }

        private _suffixe: string;

        public get suffixe(): string {
            return this._suffixe;
        }

        public set suffixe(value: string) {
            this._suffixe = value;
        }

        private _nomComplet: string;

        public get nomComplet(): string {
            return this._nomComplet;
        }

        public set nomComplet(value: string) {
            this._nomComplet = value;
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

        //endregion

        constructor(dbContext: snm.services.dal.DbContext, data?: PersonneData) {
            super(dbContext);

            if (data) {
                this._id = data.id;
                this._prenom = data.prenom;
                this._autresPrenoms = data.autresPrenoms;
                this._nom = data.nom;
                this._suffixe = data.suffixe;
                this._nomComplet = data.nomComplet;
                this._organismeId = data.organismeId;
            }
        }

        public getKey(): number {
            return this._id;
        }
    }
}