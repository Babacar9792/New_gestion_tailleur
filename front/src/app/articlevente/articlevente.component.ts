import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleventeService } from '../services/articlevente.service';
import { ParentService } from '../services/parent.service';
import { Link } from '../interfaces/link';
import { DataResponse } from '../interfaces/data-response';
import { Article } from '../interfaces/article';
import { ArticleVente } from '../interfaces/article-vente';
import { ResponseArticleVente } from '../interfaces/response-article-vente';
import { Categorie } from '../interfaces/categorie';
import { FormGroup } from '@angular/forms';
import { FormventeComponent } from './formvente/formvente.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-articlevente',
  templateUrl: './articlevente.component.html',
  styleUrls: ['./articlevente.component.css']
})
export class ArticleventeComponent implements OnInit {




  links: Link[] = [];
  articles: ArticleVente[] = [];
  categories: Categorie[] = [];
  allCategories: Categorie[] = [];
  spinner: boolean = true;
  articlesConfections: Article[] = []
  addOrUpdate: boolean = true;
  @ViewChild(FormventeComponent, { static: false }) formvente: FormventeComponent = <FormventeComponent>{};



  constructor(private articleVenteService: ArticleventeService) { }
  // constructor(private articleVenteService : ParentService) {}

  ngOnInit(): void {


    this.chargeData();
  }

  chargeData(page: number = 1) {

    const vente = this.articleVenteService.getAll("articleVente?page=" + page).subscribe({
      next: (value: ResponseArticleVente) => {
        // let common = [1,2,3,8].filter(x => [1,2,8].indexOf(x) !== -1)
        // console.log(common);
        // this.spinner = false;
        this.articles = [];
        // setTimeout(() => {
        //   this.spinner = true;
        // }, 2000);
        this.links = value.links!;
        this.articles = value.data;
        this.allCategories = value.categories;
        this.categories = this.allCategories.filter((element: Categorie) => element.type_categorie === 'AV');
        this.articlesConfections = value.articles
      },
      error: (error) => {

        alert(error.message);
      },

      complete: () => {
        // this.spinner = true;
      }
    }
    );

    setTimeout(() => {
      vente.unsubscribe();

    }, 5000);
  }
  changePage(event: number) {
    this.chargeData(+event);
    this.formvente.registerFormForSell.reset();
  }

  delete(event: number) {
    this.articleVenteService.delete("articleVente/" + event, {}).subscribe({
      next: (value: any) => {
        this.articles = this.articles.filter(element => element.id !== event);
        alert(value.message)
      },
      error: (error) => {
        alert(error.error.message)
      }
    });
  }


  addArticle(event: FormGroup) {
    if (this.addOrUpdate) {
      this.articleVenteService.addElement<DataResponse<ArticleVente[]>>(event.value, "articleVente").subscribe({
        next: (valeur) => {
          this.formvente.registerFormForSell.reset();
          alert(valeur.message);
        },
        error: (error) => {
          alert(error.error.message)

        }
      })
    }
    else {

      this.articleVenteService.update('articleVente/update', this.formvente.registerFormForSell.value).subscribe({
        next: (value : any) => {
          alert(value.message)
        },
        error: error => {
          alert(error.error.message)
        }
      })
      this.addOrUpdate = !this.addOrUpdate;
    }

  }

  updateArticle(event: any) {
    this.addOrUpdate = !this.addOrUpdate;
    this.formvente.registerFormForSell.patchValue(event);
    this.formvente.image = this.formvente.registerFormForSell.get('photo')!.value!;
  }



}
