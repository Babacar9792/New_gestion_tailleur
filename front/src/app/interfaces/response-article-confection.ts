import { Article } from "./article";
import { Categorie } from "./categorie";
import { DataResponse } from "./data-response";
import { Fournisseur } from "./fournisseur";

export interface ResponseArticleConfection extends DataResponse<Article[]> {
    fournisseurs : Fournisseur[],
    categories : Categorie[],

}
