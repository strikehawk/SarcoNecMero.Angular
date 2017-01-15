declare module snm.pers {
    export interface PersonneSummary {
        id: number;
        prenom: string;
        autresPrenoms: string;
        nom: string;
        suffixe: string;
        nomComplet: string;
    }
}
