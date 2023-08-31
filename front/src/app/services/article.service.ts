import { Injectable } from '@angular/core';
import { ParentService } from './parent.service';
import { Article } from '../interfaces/article';
import { ResponseArticleConfection } from '../interfaces/response-article-confection';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends ParentService<ResponseArticleConfection> {

  // constructor() { }
  
}
