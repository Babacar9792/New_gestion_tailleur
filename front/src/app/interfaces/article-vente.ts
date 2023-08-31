import { Article } from "./article";
import { Categorie } from "./categorie";

export interface ArticleVente {

    id ?: number,
    libelle : string,
    categorie : Categorie,
    confection_by_vente : Article[],
    quantite_stock ?: number,
    reference : string,
    promo : number,
    photo ?: string,
    marge : number,
    prix_vente : number,
    prix_confection : number
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