import { Article } from "./article";
import { Categorie } from "./categorie";

export interface ArticleVente {

  id?: number,
  libelle: string,
  categorie: Categorie,
  confection_by_vente: pivot[],
  quantite_stock?: number,
  reference: string,
  promo: number,
  photo?: string,
  marge: number,
  prix_vente: number,
  prix_confection: number
}

export interface pivot {
  article_id : number
  categorie : Categorie,
  libelle_article : string
  quantite_necessaire : number 

}


/* 

{
        id: 3,
        libelle: 'EAAA',
        categorie: { id: 1, libelle: 'Bouton', type_categorie: 'AC' },
        confection_vente: [
          {
            libelle: 'Aiguille',
            id: 6,
            prix: 1,
            stock: 10,
            categorie: { id: 4, libelle: 'Tissu', type_categorie: 'AC' },
            reference: 'REFDIG'
          }
        ],
        quantite_stock: 220
      },


*/