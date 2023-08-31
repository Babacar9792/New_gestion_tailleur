import { Categorie } from "./categorie";

export interface Article {
    libelle : string,
    id ?: number,
    prix : number,
    stock : number,
    categorie : Categorie,
    reference : string
}
