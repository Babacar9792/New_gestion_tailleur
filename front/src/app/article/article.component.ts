import { Component, OnInit } from '@angular/core';
import { Response } from '../interfaces/response';

import { Categorie } from '../interfaces/categorie';
import { Fournisseur } from '../interfaces/fournisseur';
import { environment } from 'src/environments/environment.development';
import { ArticleService } from '../services/article.service';
import { DataResponse } from '../interfaces/data-response';
import { Article } from '../interfaces/article';
import { ResponseArticleConfection } from '../interfaces/response-article-confection';
import { Links } from '../interfaces/links';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {


  constructor(private articleService: ArticleService) { }
  articles: Article[] = [];
  fournisseurs: Fournisseur[] = [];
  links: Links[] = [];
  public categories: Categorie[] = [];


  ngOnInit(): void {
    // const articles = this.articleService.all(environment.api.url+"article")
    // const articles = this.articleService.all().subscribe({ 



    //   next (value : Response<any,Categorie,Fournisseur>)  {
    //     // this.categories = value.categories;
    //     console.log(value);

    //   },
    //   complete (){
    //     console.log("loader");

    //   },
    //   error (error) {
    //     console.log(error.message);

    //   }

    // })


    this.chargeData();



  }

  chargeData(page: number = 1) {
    console.log(page);
    
    const chargement = this.articleService.getAll("article?page=" + page).subscribe({
      next: (value: ResponseArticleConfection) => {
        console.log(value)
        this.categories = value.categories;
        this.articles = value.data;
        this.fournisseurs = value.fournisseurs;
        console.log(value.fournisseurs);
        
        this.links = value.links!;

      },
      error: (error) => {
        console.log(error);
      }
    })

    setTimeout(() => {
      chargement.unsubscribe();

    }, 5000);
  }

  changePage(event: number) {
    // console.log(event);
    this.chargeData(+event);
  }

}
