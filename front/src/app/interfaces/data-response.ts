import { Categorie } from "./categorie";
import { Fournisseur } from "./fournisseur";
import { Link } from "./link";

export interface DataResponse <T>{
    data : T,
    message : string,
    status : boolean,
    links ?: Link[],
    


}
