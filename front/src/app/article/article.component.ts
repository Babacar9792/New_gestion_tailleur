import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { Response } from '../interfaces/response';
import { Article } from '../interfaces/article';
import { Categorie } from '../interfaces/categorie';
import { Fournisseur } from '../interfaces/fournisseur';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  
  constructor (private articleService :  ArticleService){}
 public categories :Categorie[] = [];


  ngOnInit(): void {
    // const articles = this.articleService.all(environment.api.url+"article")
      const articles = this.articleService.all().subscribe({ 
      


        next (value : Response<any,Categorie,Fournisseur>)  {
          // this.categories = value.categories;
          console.log(value);
          
          // console.log(this.categories);
          // console.log(value.fournisseurs);
          
          
        },
        complete (){
          console.log("loader");
          // setTimeout(() => {
          //   console.log("pas de loader");
            
            
          // }, 3000);
          
        },
        error (error) {
          console.log(error.message);
          
        }

      })

      // setTimeout(() => {
      //   articles.unsubscribe();
        
      // }, 5000);
      
  }

}
