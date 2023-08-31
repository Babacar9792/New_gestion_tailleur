import { Injectable } from '@angular/core';
import { ParentService } from './parent.service';
import { ArticleVente } from '../interfaces/article-vente';
import { ResponseArticleVente } from '../interfaces/response-article-vente';

@Injectable({
  providedIn: 'root'
})
export class ArticleventeService extends ParentService<ResponseArticleVente> {

  
}
