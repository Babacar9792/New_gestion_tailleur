import { Link } from "./link";

export interface Response<A,C,F> {
    data : A[],
    categories : C[],
    fournisseurs : F[],
    message : string,
    status : boolean,
    links : Link[]
 
}
