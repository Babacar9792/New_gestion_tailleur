import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Response } from '../interfaces/response';
import { Article } from '../interfaces/article';
import { Categorie } from '../interfaces/categorie';
import { Fournisseur } from '../interfaces/fournisseur';
import { ServiceMereService } from './service-mere.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService  {

  // extends ServiceMereService<any>
  // protected override uri = "article";

  constructor(private http : HttpClient) { }

  all(page : number =1) : Observable<Response<any,Categorie, Fournisseur>>
  {
    return this.http.get<Response<any,Categorie, Fournisseur>>(environment.api.url+"articl");
  }
  
}
