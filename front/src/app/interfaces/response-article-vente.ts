import { Article } from "./article";
import { ArticleVente } from "./article-vente";
import { Categorie } from "./categorie";
import { DataResponse } from "./data-response";

export interface ResponseArticleVente extends DataResponse<ArticleVente[]> {
    categories : Categorie[],
    articles : Article[]
    

}
